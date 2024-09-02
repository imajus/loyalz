'use client';

import { useEffect, useState } from 'react';

import { MainWrapper } from '@/shared/components';
import { CampaignState, TokenEvent, TransactionItem } from '@/shared/types';
import { listBurns, listCampaigns, listMints } from '@/shared/utils/rollup';
import { brandName, productName, tokenName } from '@/shared/utils/token';

import { HistoryItem } from './ui/HistoryItem';

const getMintTransaction = (
  mint: TokenEvent,
  campaigns: CampaignState[],
  index: number,
): TransactionItem => {
  const { token, amount } = mint;
  const campaign = campaigns[mint.campaign];

  return {
    id: `mint-${index}`,
    productName: productName(campaign.sku),
    sum: amount,
    token: tokenName(token),
    brandName: brandName(campaign.manager),
    type: 'mint',
  };
};

const getBurnTransaction = (
  burn: TokenEvent,
  campaigns: CampaignState[],
  index: number,
): TransactionItem => {
  const { token, amount } = burn;
  const campaign = campaigns[burn.campaign];

  return {
    id: `burn-${index}`,
    productName: productName(campaign.reward || ''),
    sum: amount,
    token: tokenName(token),
    brandName: brandName(campaign.manager),
    type: 'burn',
  };
};

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
