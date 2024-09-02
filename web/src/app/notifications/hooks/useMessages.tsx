import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import db, { Conversation, Message } from '../model/db';
import { loadMessages } from '../model/messages';
import { useClient } from './useClient';

export function useMessages(conversations: Conversation[]): Message[] | undefined {
  const client = useClient();

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
