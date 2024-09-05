'use client';
import { useEffect, useState } from 'react';

import { CampaignsListTable, Overlay, Spinner } from '@/shared/components/';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Campaign } from '@/shared/types';
import { listCampaigns } from '@/shared/utils/rollup';
import { getCampaign } from '@/shared/utils/token';

import { CreateCampaignForm } from './create-campaign-form/CreateCampaignForm';

export const BrandManagerHome = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

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
    <div className="w-full flex flex-col gap-3">
      <div className="font-['Inter'] w-full flex justify-start">
        <span className="font-bold text-[30px]">List of campaigns</span>
      </div>
      {isLoading ? <Spinner /> : <CampaignsListTable campaigns={campaigns} />}
      <Button className="w-40" onClick={() => setIsFormVisible(true)}>
        + Create campaign
      </Button>
      <Overlay
        isVisible={isFormVisible}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgb(203 213 225 / 0.8)',
        }}
      >
        <CreateCampaignForm setIsFormVisible={setIsFormVisible} />
      </Overlay>
    </div>
  );
};
