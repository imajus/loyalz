'use client';

import { useEffect, useState } from 'react';

import { MainWrapper } from '@/shared/components';
import { CampaignState, TransactionItem } from '@/shared/types';
import { listCampaigns } from '@/shared/utils/rollup';
import { getWalletBalance } from '@/shared/utils/token';

import { ExchangeItem } from './ui/ExchangeItem';

export const Exchange = () => {
  const [hasError, setHasError] = useState(false);
  const [walletBalance, setWalletBalance] = useState<TransactionItem[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignState[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const walletBalance = await getWalletBalance(false);
        setWalletBalance(() => [...walletBalance]);

        const campaigns = await listCampaigns();
        const eligibleCampaigns = campaigns.filter((c) => c.reward && c.active);
        setCampaigns(eligibleCampaigns);
      } catch (e: any) {
        console.error(`Wallet balance initialization failed: ${e}`);
        setHasError(true);
      }
    };

    void init();
  }, []);

  return (
    <MainWrapper title="Exchange" page="exchange" isError={hasError}>
      <div
        className="flex flex-col m-5 gap-6 overflow-y-scroll overflow-x-hidden h-full pr-[1px]"
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
      >
        {campaigns.map((product, idx) => (
          <ExchangeItem
            key={`exchange-item-${idx}`}
            product={product}
            walletBalance={walletBalance}
          />
        ))}
      </div>
    </MainWrapper>
  );
};
