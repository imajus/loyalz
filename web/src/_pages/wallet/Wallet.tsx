'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, MainWrapper } from '@/shared/components';
import { useWeb3Auth } from '@/shared/hook';

import { WalletItem } from './types';
import { BalanceItem } from './ui/BalanceItem';
import { getWalletBalance } from './utils';

export const Wallet = () => {
  const router = useRouter();
  const [walletBalance, setWalletBalance] = useState<WalletItem[]>([]);
  const { logoutWeb3Auth, isError } = useWeb3Auth();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const walletBalance = await getWalletBalance();

        setWalletBalance(() => [...walletBalance]);
      } catch (e: any) {
        console.error(`Wallet balance initialization failed: ${e}`);
        setHasError(true);
      }
    };

    void init();
  }, []);

  return (
    <MainWrapper title="Wallet" page="wallet" isError={isError || hasError}>
      <div
        className="flex flex-col justify-start items-center m-5 gap-6 overflow-y-scroll overflow-x-hidden h-full pr-[1px]"
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
      >
        {walletBalance.map((item) => (
          <BalanceItem key={item.id} item={item} />
        ))}
        {!walletBalance.length && (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-2xl font-bold text-black">You have no tokens</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center h-32 gap-3 w-full">
        <Button
          onClick={() => router.push('/customer/history', { scroll: false })}
          title="Transaction history"
        />
        <Button
          onClick={async () => {
            await logoutWeb3Auth?.();
            router.push('/customer/earn', { scroll: false });
          }}
          title="Log out"
        />
      </div>
    </MainWrapper>
  );
};
