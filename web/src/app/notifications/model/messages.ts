import * as XMTP from '@xmtp/xmtp-js';
import { Mutex } from 'async-mutex';
import { getXMTPConversation, stripTopicName, updateConversationTimestamp } from './conversations';
import db, { Conversation, Message } from './db';
import { process } from './message-processor';

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
    saveMessage(client, conversation, message, true);
  }

  for await (const message of await xmtpConversation.streamMessages()) {
    await saveMessage(client, conversation, message);
  }
}
