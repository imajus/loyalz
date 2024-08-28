'use client';

import { useRouter } from 'next/navigation';

import { transactions } from '@/mock/transactions';
import { Button, MainWrapper } from '@/shared/components';

import { HistoryItem } from './ui/HistoryItem';

export const HistoryPage = () => {
  const router = useRouter();

  return (
    <MainWrapper title="History" page="history">
      <div
        className="flex flex-col gap-6 overflow-y-scroll overflow-x-hidden h-full w-full"
        style={{ scrollbarWidth: 'none' }}
      >
        {transactions.map((item) => (
          <HistoryItem key={`${item.date}-${item.tokenCompany}`} item={item} />
        ))}
      </div>
      <div className="flex items-center justify-center h-20 w-full">
        <Button onClick={() => router.push('/wallet', { scroll: false })} title="Go back" />
      </div>
    </MainWrapper>
  );
};
