'use client';

import { useEffect, useState } from 'react';

import { MainWrapper } from '@/shared/components';
import { TransactionItem } from '@/shared/types';
import { listBurns, listCampaigns, listMints } from '@/shared/utils/rollup';
import { getBurnTransaction, getMintTransaction } from '@/shared/utils/token';

import { HistoryItem } from './ui/HistoryItem';

//TODO: earn page data: list campaigns and exchange
// wallet:

export const HistoryPage = () => {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const campaigns = await listCampaigns();

      const burns = (await listBurns()).map((tr, idx) => getBurnTransaction(tr, campaigns, idx));

      const mints = (await listMints()).map((tr, idx) => getMintTransaction(tr, campaigns, idx));

      setTransactions(() => [...burns, ...mints]);
    };
    void fetchData();
  }, []);

  return (
    <MainWrapper title="History" page="wallet">
      <div
        className="flex flex-col gap-6 overflow-y-scroll overflow-x-hidden h-full w-full"
        style={{ scrollbarWidth: 'none' }}
      >
        {transactions.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </div>
    </MainWrapper>
  );
};
