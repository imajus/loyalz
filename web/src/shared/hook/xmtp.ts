import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import db, { Conversation, Message } from '../models/xmtp';
import { loadMessages, saveConversation } from '../utils/xmtp';
import { useWeb3Auth } from './useWeb3Auth/useWeb3Auth';

export function useConversations(broadcastAddresses: string[]): Conversation[] {
  const { xmtpUser } = useWeb3Auth();

  useEffect(() => {
    void (async () => {
      if (!xmtpUser) return;
      for (const xmtpConversation of await xmtpUser.conversations.list()) {
        // if (broadcastAddresses.includes(xmtpConversation.peerAddress)) {
        await saveConversation(xmtpConversation);
        console.log(broadcastAddresses);
        // }
      }
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      if (!xmtpUser) return;
      for await (const conversation of await xmtpUser.conversations.stream()) {
        // if (broadcastAddresses.includes(conversation.peerAddress)) {
        await saveConversation(conversation);
        // }
      }
    })();
  }, []);

  return (
    useLiveQuery(async () => {
      return await db.conversations.reverse().sortBy('updatedAt');
    }) || []
  );
}

export function useMessages(conversations: Conversation[]): Message[] | undefined {
  const { xmtpUser } = useWeb3Auth();

  useEffect(() => {
    if (!xmtpUser) return;
    conversations.forEach((converso) => loadMessages(converso, xmtpUser));
  }, [xmtpUser, conversations]);

  return useLiveQuery(async () => {
    return await db.messages
      .where({
        inReplyToID: '',
      })
      .sortBy('sentAt');
  });
}
