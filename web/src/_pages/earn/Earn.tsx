'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { Button, DoneMessage, GoBackButton, MainWrapper } from '@/shared/components';
import { CampaignState } from '@/shared/types';
import { listCampaigns } from '@/shared/utils/rollup';

import { Product } from './ui/Product';

const Message = ({ children }: { children: ReactNode }) => {
  return <DoneMessage>{children}</DoneMessage>;
};

export const Earn = () => {
  const router = useRouter();
  const [isDone, setIsDone] = useState(false);
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

  if (isDone) {
    return (
      <MainWrapper title="Earn" page="earn" isError={hasError}>
        <Message>
          <div className="h-full w-full flex flex-col items-center justify-between py-3">
            <div className="text-[35px] text-black text-center flex flex-col">
              <span>You are now eligible</span>
              <span>to receive a</span>
              <span>&quot;Chocolate&quot;</span>
            </div>
            <GoBackButton handleClick={() => setIsDone(false)} />
          </div>
        </Message>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper title="Earn" page="earn" isLoading={isLoading}>
      <div
        className="flex m-5 gap-6 overflow-y-scroll overflow-x-hidden h-full flex-col items-start flex-grow"
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
        onClick={() => setIsDone(true)}
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
