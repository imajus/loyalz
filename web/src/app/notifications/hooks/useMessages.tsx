import { useEffect } from 'react';
import { useClient } from './useClient';
import { loadMessages } from '../model/messages';
import db, { Conversation, Message } from '../model/db';
import { useLiveQuery } from 'dexie-react-hooks';

export function useMessages(conversations: Conversation[]): Message[] | undefined {
  const client = useClient();

  useEffect(() => {
    if (!client) return;
    conversations.forEach(converso => loadMessages(converso, client))
  }, [client, conversations]);

  return useLiveQuery(async () => {
    return await db.messages
      .where({
        inReplyToID: '',
      })
      .sortBy('sentAt');
  });
}
