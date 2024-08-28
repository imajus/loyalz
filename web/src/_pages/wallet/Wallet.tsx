'use client';
import { walletBalance } from '@/mock/wallet';
import { Button, MainWrapper } from '@/shared/components';

import { BalanceItem } from './ui/BalanceItem';

export const Wallet = () => {
  return (
    <MainWrapper title="Wallet" page="wallet">
      <div
        className="flex flex-col m-5 gap-6 overflow-y-scroll overflow-x-hidden h-full"
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
      >
        {walletBalance.map((item) => (
          <BalanceItem key={item.unit} item={item} />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center h-32 gap-3 w-full">
        <Button onClick={() => alert('scan re')} title="Transaction history" />
        <Button onClick={() => alert('scan re')} title="Log out" />
      </div>
    </MainWrapper>
  );
};
