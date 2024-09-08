'use client';
import { ethers } from 'ethers';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, Icon, RetailerWrapper } from '@/shared/components';
import { useWeb3Auth } from '@/shared/hook';
import { GreenEllipseWithPresent } from '@/shared/icon';
import { CampaignState, ClaimRewardInputs } from '@/shared/types';
import { claimReward, listCampaigns } from '@/shared/utils/rollup';
import { getToken, getTokenSrc } from '@/shared/utils/token';

import { ExchangeConfirmedMessage } from './ui/ExchangeConfirmedMessage';

const getTransactionText = (campaign: CampaignState | undefined) => {
  if (!campaign) {
    return '';
  }

  if (!campaign.otherToken) {
    return `You will give a ${campaign.reward} for ${campaign.mintAmount} ${getToken(campaign.mintToken)}`;
  }

  return `You will give a ${campaign.reward} for ${campaign.mintAmount} ${getToken(campaign.mintToken)} and ${campaign.otherAmount} ${getToken(campaign.otherToken)}`;
};

export const ConfirmExchange = () => {
  const [isDone, setIsDone] = useState(false);
  const router = useRouter();
  const [campaign, setCampaign] = useState<CampaignState>();
  const [tokens, setTokens] = useState<{ token: string; amount: number }[]>([]);
  const { provider } = useWeb3Auth();

  useEffect(() => {
    const init = async () => {
      const campaigns = await listCampaigns();
      const campaign = campaigns?.[1] || campaigns?.[0];
      setCampaign(campaign);

      if (!campaign) return;
      const tokens = [{ token: campaign.mintToken, amount: campaign.mintAmount }];

      if (campaign.otherToken && campaign.otherAmount) {
        tokens.push({ token: campaign.otherToken, amount: campaign.otherAmount });
      }

      setTokens(tokens);
    };

    void init();
  }, []);

  const handleExchangeClick = async () => {
    setIsDone(true);
    const claimInputs: ClaimRewardInputs = {
      campaign: 1,
      customer: '0xD392b72A6bf7E718f5Cf67A2b0F92b7ac48Fcfe0',
    };

    if (!provider) return;
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    void claimReward(claimInputs, signer);
  };

  const doneMessage = (
    <ExchangeConfirmedMessage
      tokens={tokens}
      brand={campaign?.manager || ''}
      handleBackClick={() => setIsDone(false)}
    />
  );

  return (
    <RetailerWrapper title="Done" DoneMessage={doneMessage} isDone={isDone} isError={false}>
      <div className="w-full h-full flex flex-col justify-between items-center gap-7 pt-10">
        <div className="w-full flex flex-col gap-3">
          <div className="flex flex-row items-center justify-center gap-3">
            <GreenEllipseWithPresent />
            <ArrowRightIcon size={100} />

            <div className="flex flex-col gap-2">
              {tokens.map((item, index) => (
                <Icon src={getTokenSrc(item.token)} key={index} />
              ))}
            </div>
          </div>

          <span className="font-['Radio_Canada] text-[35px] text-center">
            {getTransactionText(campaign)}
          </span>
        </div>

        <div className="flex items-center justify-center h-20 w-full gap-3">
          <Button onClick={handleExchangeClick} btnSize="sm">
            <span className="font-['Racing_Sans_One'] text-2xl">Exchange</span>
          </Button>
          <Button onClick={() => router.push('/retailer', { scroll: false })} btnSize="sm">
            <span className="font-['Racing_Sans_One'] text-2xl">Cancel</span>
          </Button>
        </div>
      </div>
    </RetailerWrapper>
  );
};
