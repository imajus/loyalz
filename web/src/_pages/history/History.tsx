'use client';

import { transactions } from '@/mock/transactions';
import { MainWrapper } from '@/shared/components';

import { HistoryItem } from './ui/HistoryItem';

export const HistoryPage = () => {
  return (
    <MainWrapper title="History" page="wallet">
      <div
        className="flex flex-col gap-6 overflow-y-scroll overflow-x-hidden h-full w-full"
        style={{ scrollbarWidth: 'none' }}
      >
        {transactions.map((item) => (
          <HistoryItem key={`${item.date}-${item.tokenCompany}`} item={item} />
        ))}
      </div>
    </MainWrapper>
  );
};
