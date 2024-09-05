import { useClient, useConversations, useMessages } from '@/shared/hook/xmtp';
import { Message } from '@/shared/models/xmtp';
import { ContentTypeReaction } from '@xmtp/content-type-reaction';
import { ReactElement } from 'react';
// @ts-ignore
import { ContentTypeId } from '@xmtp/xmtp-js';
import MessageCellView from './MessageCellView';

const appearsInMessageList = (message: Message): boolean => {
  if (ContentTypeReaction.sameAs(message.contentType as ContentTypeId)) {
    return false;
  }
  return true;
};

export function NewsListView(): ReactElement {
  const { client } = useClient();
  const conversations = useConversations(['']);
  const messages = useMessages(conversations)?.filter(
    ({ senderAddress }) => senderAddress !== client?.address,
  );

  return (
    <div>
      {messages?.length == 0 && <p>No messages yet.</p>}
      {messages ? (
        messages.reduce((acc: ReactElement[], message: Message) => {
          if (appearsInMessageList(message)) {
            acc.push(<MessageCellView key={message.id} message={message} />);
          }
          return acc;
        }, [] as ReactElement[])
      ) : (
        <span>Could not load messages</span>
      )}
    </div>
  );
}

export default NewsListView;
