'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, MainWrapper } from '@/shared/components';
import { CampaignState } from '@/shared/types';
import { listCampaigns } from '@/shared/utils/rollup';

import { Product } from './ui/Product';

export const Earn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [hasError, setHasError] = useState(false);
  const [campaigns, setCampaigns] = useState<CampaignState[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const campaigns = await listCampaigns();
        setCampaigns(campaigns);
      } catch (e: any) {
        console.error(`Wallet balance initialization failed: ${e}`);
        setHasError(true);
      }
      setIsLoading(false);
    };

    void init();
  }, []);

  return (
    <MainWrapper title="Earn" page="earn" isLoading={isLoading} isError={hasError}>
      <div
        className="flex m-5 gap-6 overflow-y-scroll overflow-x-hidden h-full flex-col items-start flex-grow"
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
      >
        {campaigns.map((product, idx) => (
          <Product key={`campaign-${idx}`} product={product} />
        ))}
      </div>
      <div className="flex items-center justify-center h-20 w-full">
        <Button
          onClick={() => router.push('/customer/scan-receipt-qr', { scroll: false })}
          title="Scan receipt QR"
        />
      </div>
    </MainWrapper>
  );
};
