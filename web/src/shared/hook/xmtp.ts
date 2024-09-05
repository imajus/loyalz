import { useLiveQuery } from 'dexie-react-hooks';
import { useContext, useEffect } from 'react';
import { XmtpClientContext } from '../context/xmtp/XmtpClientProvider';
import db, { Conversation, Message } from '../models/xmtp';
import { loadMessages, saveConversation } from '../utils/xmtp';

export function useClient() {
  const context = useContext(XmtpClientContext);
  return context;
}

export function useConversations(broadcastAddresses: string[]): Conversation[] {
  const { client } = useClient();

  useEffect(() => {
    void (async () => {
      if (!client) return;
      for (const xmtpConversation of await client.conversations.list()) {
        // if (broadcastAddresses.includes(xmtpConversation.peerAddress)) {
        await saveConversation(xmtpConversation);
        console.log(broadcastAddresses);
        // }
      }
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      if (!client) return;
      for await (const conversation of await client.conversations.stream()) {
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
  const { client } = useClient();

  useEffect(() => {
    if (!client) return;
    conversations.forEach((converso) => loadMessages(converso, client));
  }, [client, conversations]);

  return useLiveQuery(async () => {
    return await db.messages
      .where({
        inReplyToID: '',
      })
      .sortBy('sentAt');
  });
}
