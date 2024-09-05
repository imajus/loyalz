import { IProvider } from '@web3auth/base';
import { ContentTypeReadReceipt } from '@xmtp/content-type-read-receipt';
import * as XMTP from '@xmtp/xmtp-js';
import { Client } from '@xmtp/xmtp-js';
import { Mutex } from 'async-mutex';
// @ts-ignore
import { ContentTypeId } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';
import db, { Conversation, Message } from '../models/xmtp';

export const allowedConsentList = async (client: Client) => {
  // Fetch the consent list from the client
  const consentList = await client.contacts.refreshConsentList();

  // Create a unique consent list by removing duplicates
  let uniqueConsentList = consentList
    .slice() // Create a copy of the consent list
    .reverse() // Reverse the list to keep the latest consent
    .filter(
      // Filter out duplicates by checking if the current index is the first occurrence of the consent value
      (consent, index, self) => index === self.findIndex((t) => t.value === consent.value),
    )
    .reverse(); // Reverse the list back to the original order

  // Sort the unique consent list based on the permission type
  uniqueConsentList = uniqueConsentList.sort((a, b) => {
    // If 'a' is allowed and 'b' is not, 'a' should come first
    if (a.permissionType === 'allowed' && b.permissionType !== 'allowed') return -1;
    // If 'a' is unknown and 'b' is not, 'b' should come first
    if (a.permissionType === 'unknown' && b.permissionType !== 'unknown') return 1;
    // If 'a' is denied and 'b' is not, 'b' should come first
    if (a.permissionType === 'denied' && b.permissionType !== 'denied') return 1;
    // If none of the above conditions are met, keep the original order
    return 0;
  });

  // Return the unique and sorted and allowed consent list
  return uniqueConsentList.filter(({ permissionType }) => permissionType === 'allowed');
};

// Prevent races when updating the local database
const conversationMutex = new Mutex();

// TODO: figure out better way to turn db Conversation -> XMTP.Conversation
export async function getXMTPConversation(
  client: XMTP.Client,
  conversation: Conversation,
): Promise<XMTP.Conversation> {
  const conversations = await client.conversations.list();
  const xmtpConversation = conversations.find(
    (xmtpConversation) => stripTopicName(xmtpConversation.topic) == conversation.topic,
  );

  if (!xmtpConversation) throw new Error('could not convert db conversation to XMTP conversation');

  return xmtpConversation;
}

export async function findConversation(topic: string): Promise<Conversation | undefined> {
  return await db.conversations.where('topic').equals(stripTopicName(topic)).first();
}

export async function updateConversationTimestamp(topic: string, updatedAt: Date) {
  const conversation = await db.conversations.where('topic').equals(topic).first();

  if (conversation && conversation.updatedAt < updatedAt) {
    await conversationMutex.runExclusive(async () => {
      await db.conversations.update(conversation, { updatedAt });
    });
  }
}

export function stripTopicName(conversationTopic: string): string {
  return conversationTopic.replace('/xmtp/0/', '').replace('/proto', '');
}

export async function startConversation(
  client: XMTP.Client,
  address: string,
): Promise<Conversation> {
  const xmtpConversation = await client.conversations.newConversation(address);
  return await saveConversation(xmtpConversation);
}

export async function saveConversation(xmtpConversation: XMTP.Conversation): Promise<Conversation> {
  return await conversationMutex.runExclusive(async () => {
    const existing = await db.conversations
      .where('topic')
      .equals(stripTopicName(xmtpConversation.topic))
      .first();

    if (existing) {
      return existing;
    }

    const conversation: Conversation = {
      topic: stripTopicName(xmtpConversation.topic),
      title: undefined,
      createdAt: xmtpConversation.createdAt,
      updatedAt: xmtpConversation.createdAt,
      peerAddress: xmtpConversation.peerAddress,
    };

    conversation.id = await db.conversations.add(conversation);

    return conversation;
  });
}

export async function process(
  conversation: Conversation,
  { contentType, message }: { contentType: ContentTypeId; message: Message },
) {
  if (ContentTypeReadReceipt.sameAs(contentType)) {
    // Get items from the read receipts table based on peerAddress within conversation
    await db.readReceipts
      .get({ peerAddress: conversation.peerAddress })
      .then(async (existingEntry) => {
        // If the entry doesn't exist, add it with content timestamp
        if (!existingEntry) {
          await db.readReceipts.add({
            peerAddress: conversation.peerAddress,
            timestamp: message.content?.timestamp,
          });
        }
        // If the entry does exist, update it with content timestamp
        else {
          await db.readReceipts.update(conversation.peerAddress, {
            timestamp: message.content?.timestamp,
          });
        }
      });
  } else {
    message.id = await db.messages.add(message);
  }
}

const messageMutex = new Mutex();

async function nonMutex<T>(fn: () => Promise<T>) {
  return await fn();
}

export async function saveMessage(
  client: XMTP.Client,
  conversation: Conversation,
  decodedMessage: XMTP.DecodedMessage,
  useMutex = true,
): Promise<Message> {
  const runner = useMutex ? messageMutex.runExclusive.bind(messageMutex) : nonMutex;

  return await runner(async () => {
    const existing = await db.messages.where('xmtpID').equals(decodedMessage.id).first();

    if (existing) {
      return existing;
    }

    const message: Message = {
      conversationTopic: stripTopicName(decodedMessage.contentTopic),
      inReplyToID: '',
      xmtpID: decodedMessage.id,
      senderAddress: decodedMessage.senderAddress,
      sentByMe: decodedMessage.senderAddress == client.address,
      sentAt: decodedMessage.sent,
      contentType: { ...decodedMessage.contentType },
      content: decodedMessage.content,
      isSending: false,
    };

    await process(conversation, {
      contentType: decodedMessage.contentType,
      message,
    });

    await updateConversationTimestamp(message.conversationTopic, message.sentAt);

    return message;
  });
}

export async function loadMessages(conversation: Conversation, client: XMTP.Client) {
  const xmtpConversation = await getXMTPConversation(client, conversation);
  for (const message of await xmtpConversation.messages()) {
    void saveMessage(client, conversation, message, true);
  }

  for await (const message of await xmtpConversation.streamMessages()) {
    await saveMessage(client, conversation, message);
  }
}

export const createConsentMessage = (peerAddress: string, timestamp: number): string => {
  return (
    'XMTP : Grant inbox consent to sender\n' +
    '\n' +
    `Current Time: ${new Date(timestamp).toUTCString()}\n` +
    `From Address: ${peerAddress}\n` +
    '\n' +
    'For more info: https://xmtp.org/signatures/'
  );
};

export const getSigner = async (provider: IProvider): Promise<ethers.Signer> => {
  const ethersProvider = new ethers.BrowserProvider(provider);
  const signer = await ethersProvider.getSigner();
  return signer;
};
