import Image from 'next/image';

import { WalletBalanceItem } from '@/shared/types';

type PropTypes = {
  item: WalletBalanceItem;
};

const icon =
  'https://images.unsplash.com/photo-1704394516937-306c24209cfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const BalanceItem = ({ item }: PropTypes) => {
  return (
    <div className="h-60 w-full flex flex-row items-center text-gray-600">
      <Image
        src={icon}
        alt="avatar"
        width={0}
        height={0}
        sizes="100vw"
        className="rounded-[50%] w-[80px] h-[80px] shadow-2xl bg-sapphire-blue-60%"
      />
      <div className="flex flex-col gap-3 p-1 text-sm">
        <span className="capitalize overflow-ellipsis whitespace-nowrap overflow-hidden w-32">{`${item.unit}`}</span>
        <div className="flex gap-1">
          by
          <span className="capitalize overflow-ellipsis whitespace-nowrap overflow-hidden w-[107px]">{`${item.company}`}</span>
        </div>
      </div>
      <span className="w-[88px] flex justify-end text-2xl">
        {item.sum.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </span>
    </div>
  );
};
