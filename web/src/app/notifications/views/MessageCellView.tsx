import { Message } from '@/shared/models/xmtp';
import { ReactElement } from 'react';

const title = () => {
  return 'Title';
};

export function Content({ content }: { content: any }): ReactElement {
  return (
    <div>
      <span>{content}</span>
    </div>
  );
}

export function MessageContent({ message }: { message: Message }): ReactElement {
  return <Content content={message.content} />;
}

export default function MessageCellView({ message }: { message: Message }): ReactElement {
  return (
    <div className="flex">
      <span
        title={message.sentByMe ? 'You' : message.senderAddress}
        className={message.sentByMe ? 'text-zinc-500' : 'text-green-500'}
      >
        {title() + ' ' + message.sentAt})
      </span>
      <div className="ml-2">
        <MessageContent message={message} />
      </div>
      <br />
    </div>
  );
}
