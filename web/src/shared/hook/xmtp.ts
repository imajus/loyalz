import { Client } from '@xmtp/xmtp-js';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import db, { Conversation, Message } from '../models/xmtp';
import { toastError } from '../utils/toast';
import { getXmtpClient, loadMessages, saveConversation } from '../utils/xmtp';
import { useWeb3Auth } from './useWeb3Auth/useWeb3Auth';

export function useConversations(): Conversation[] {
  const { provider } = useWeb3Auth();
  const [xmtpUser, setXmtpUser] = useState<Client | null>(null);
  useEffect(() => {
    if (provider) {
      getXmtpClient(provider)
        .then((client) => setXmtpUser(client))
        .catch((err) => toastError(err.message));
    }
  }, [provider]);

  useEffect(() => {
    void (async () => {
      if (!xmtpUser) return;
      for (const xmtpConversation of await xmtpUser.conversations.list()) {
        // TODO: filter by conversation.title
        await saveConversation(xmtpConversation);
      }
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      if (!xmtpUser) return;
      for await (const conversation of await xmtpUser.conversations.stream()) {
        // TODO: filter by conversation.title instead
        await saveConversation(conversation);
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
  const { provider } = useWeb3Auth();
  const [xmtpUser, setXmtpUser] = useState<Client | null>(null);
  useEffect(() => {
    if (provider) {
      getXmtpClient(provider)
        .then((client) => setXmtpUser(client))
        .catch((err) => toastError(err.message));
    }
  }, [provider]);

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
