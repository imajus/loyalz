'use client';
import { useRouter } from 'next/navigation';

import { walletBalance } from '@/mock/wallet';
import { Button, MainWrapper } from '@/shared/components';
import { useWeb3Auth } from '@/shared/hook';

import { BalanceItem } from './ui/BalanceItem';

export const Wallet = () => {
  const router = useRouter();
  const { logoutWeb3Auth } = useWeb3Auth();
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
        <Button
          onClick={async () => {
            await logoutWeb3Auth?.();
            router.push('/earn', { scroll: false });
          }}
          title="Log out"
        />
      </div>
    </MainWrapper>
  );
};
