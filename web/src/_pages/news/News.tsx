'use client';

import { MainWrapper } from '@/shared/components';
import { useWeb3Auth } from '@/shared/hook';
import { useConversations, useMessages } from '@/shared/hook/xmtp';
import { Message } from '@/shared/models/xmtp';
import { toastError } from '@/shared/utils/toast';
import { getXmtpClient } from '@/shared/utils/xmtp';
import { ContentTypeReaction } from '@xmtp/content-type-reaction';
// @ts-ignore
import { Client, ContentTypeId } from '@xmtp/xmtp-js';
import { ReactElement, useEffect, useState } from 'react';
import { NewsItem } from './ui/NewsItem';

const appearsInMessageList = (message: Message): boolean => {
  if (ContentTypeReaction.sameAs(message.contentType as ContentTypeId)) {
    return false;
  }
  return true;
};

export const News = () => {
  const { provider } = useWeb3Auth();
  const [xmtpUser, setXmtpUser] = useState<Client | null>(null);
  useEffect(() => {
    if (provider) {
      getXmtpClient(provider)
        .then((client) => setXmtpUser(client))
        .catch((err) => toastError(err.message));
    }
  }, [provider]);
  const conversations = useConversations();
  const messages = useMessages(conversations)?.filter(
    ({ senderAddress }) => senderAddress !== xmtpUser?.address,
  );
  return (
    <MainWrapper title="News" page="news">
      <div
        className="grid m-5 gap-14 overflow-y-scroll overflow-x-hidden h-full pt-7 "
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
      >
        {messages?.length == 0 && <p>No messages yet.</p>}
        {messages ? (
          messages.reduce((acc: ReactElement[], message: Message) => {
            if (appearsInMessageList(message)) {
              acc.push(<NewsItem key={message.id} item={message} />);
            }
            return acc;
          }, [] as ReactElement[])
        ) : (
          <span>Could not load messages</span>
        )}
      </div>
    </MainWrapper>
  );
};
