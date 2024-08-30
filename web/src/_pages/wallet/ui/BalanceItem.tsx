import Image from 'next/image';

import { Frame } from '@/shared/components';
import { WalletBalanceItem } from '@/shared/types';

type PropTypes = {
  item: WalletBalanceItem;
};

const icon =
  'https://images.unsplash.com/photo-1704394516937-306c24209cfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const BalanceItem = ({ item }: PropTypes) => {
  return (
    <Frame>
      <div className="w-full h-full flex flex-row justify-between">
        <div className="w-full h-full flex items-center justify-start">
          <Image
            src={icon}
            alt="avatar"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-[50%] w-[48px] h-[48px] shadow-2xl"
          />

          <div className="hidden sm:flex flex-col gap-1 p-1 items-center sm:items-start">
            <span className="text-sm font-bold">{`Buy ${item.unit}`}</span>
            <span className="capitalize text-xs">{`by ${item.company}`}</span>
          </div>

          <div className="flex sm:hidden flex-row gap-1 p-1 text-xl">
            <span className="capitalize text-center">{`${item.unit} by ${item.company}`}</span>
          </div>
        </div>

        <div className="w-[88px] flex items-center justify-center sm:justify-end text-sm font-bold flex-shrink-0">
          {item.sum.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
      </div>
    </Frame>
  );
};
