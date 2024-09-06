'use client';
import { useEffect, useState } from 'react';

import { Campaign } from '@/shared/types';
import { listCampaigns } from '@/shared/utils/rollup';
import { getCampaign } from '@/shared/utils/token';

import { CampaignsTable } from './ui/CampaignsTable';
import { ListOfTokens } from './ui/ListOfTokens';
import { NewsSection } from './ui/NewsSection';

export const BrandManagerHome = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const cmpns = await listCampaigns();
      const campaigns = cmpns.map((c) => getCampaign(c));
      setCampaigns(campaigns);
      setIsLoading(false);
    };

    void init();
  }, []);

  return (
    <div
      className="w-full flex flex-col gap-20 py-5 overflow-y-scroll"
      style={{ scrollbarWidth: 'none' }}
    >
      <CampaignsTable campaigns={campaigns} isLoading={isLoading} />
      <div className="flex flex-col lg:flex-row gap-20 items-start justify-between">
        <ListOfTokens isLoading={isLoading} />
        <NewsSection />
      </div>
    </div>
  );
};
