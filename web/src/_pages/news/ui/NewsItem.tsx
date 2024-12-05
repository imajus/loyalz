import moment from 'moment';

import { Frame, Icon } from '@/shared/components';
import { Message } from '@/shared/models/xmtp';
import { shortHash } from '@/shared/utils/token';

type PropTypes = {
  item: Message;
};

const icon =
  'https://images.unsplash.com/photo-1704394516937-306c24209cfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const NewsItem = ({ item }: PropTypes) => {
  return (
    <div className="w-full flex flex-row items-start justify-center text-black font-['Radio_Canada']">
      <div className="flex flex-col items-center justify-center w-16">
        <Icon src={icon} />
        <span className="text-[10px] break-all">{shortHash(item.senderAddress)}</span>
      </div>

      <div className="relative w-full flex-grow px-5">
        <div className="absolute -top-5 left-0 right-0 flex w-full items-center justify-center text-[8px]">
          {moment(item.sentAt).format('LLL')}
        </div>
        <Frame>
          <span className="text-sm px-3 py-5 break-all">{item.content}</span>
        </Frame>
      </div>
    </div>
  );
};
