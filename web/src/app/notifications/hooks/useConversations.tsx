import { broadcastConfigs } from '@/app/broadcast.config';
import * as XMTP from '@xmtp/xmtp-js';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { saveConversation } from '../model/conversations';
import db, { Conversation } from '../model/db';

export function useConversations(client: XMTP.Client | null): Conversation[] {
  const broadcastAddresses = broadcastConfigs.map(({ address }) => address);
  useEffect(() => {
    void (async () => {
      if (!client) return;
      for (const xmtpConversation of await client.conversations.list()) {
        if (broadcastAddresses.includes(xmtpConversation.peerAddress)) {
          await saveConversation(xmtpConversation);
        }
      }
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      if (!client) return;
      for await (const conversation of await client.conversations.stream()) {
        if (broadcastAddresses.includes(conversation.peerAddress)) {
          await saveConversation(conversation);
        }
      }
    })();
  }, []);

  return (
    useLiveQuery(async () => {
      return await db.conversations.reverse().sortBy('updatedAt');
    }) || []
  );
}
