import { useState } from 'react';

import { Overlay, Spinner } from '@/shared/components';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Campaign } from '@/shared/types';

import { CreateCampaignForm } from './create-campaign-form/CreateCampaignForm';
import { CampaignsListTable } from './tables/CampaignsListTable';

type PropTypes = {
  isLoading: boolean;
  campaigns: Campaign[];
};

export const CampaignsTable = ({ campaigns, isLoading }: PropTypes) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="font-['Inter'] w-full flex justify-start">
        <span className="font-bold text-[30px]">List of campaigns</span>
      </div>
      {isLoading ? (
        <div className="h-64 w-full px-5 bg-slate-300 border-2">
          <Spinner />
        </div>
      ) : (
        <CampaignsListTable campaigns={campaigns} />
      )}
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
