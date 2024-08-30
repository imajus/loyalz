'use client';
import { useRouter } from 'next/navigation';

import { walletBalance } from '@/mock/wallet';
import { Button, MainWrapper } from '@/shared/components';
import { toastInfo } from '@/shared/utils/toast';

import { BalanceItem } from './ui/BalanceItem';

export const Wallet = () => {
  const router = useRouter();
  return (
    <MainWrapper title="Wallet" page="wallet">
      <div
        className="grid m-5 gap-6 overflow-y-scroll overflow-x-hidden h-full pr-[1px]"
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
      >
        {walletBalance.map((item) => (
          <BalanceItem key={item.unit} item={item} />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center h-32 gap-3 w-full">
        <Button
          onClick={() => router.push('/history', { scroll: false })}
          title="Transaction history"
        />
        <Button onClick={() => toastInfo('scan re')} title="Log out" />
      </div>
    </MainWrapper>
  );
};
