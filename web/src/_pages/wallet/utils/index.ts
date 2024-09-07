import { CampaignState, TokenEvent } from '@/shared/types';
import { listBurns, listCampaigns, listMints } from '@/shared/utils/rollup';
import { brandName, tokenName } from '@/shared/utils/token';

import { TokenItem, WalletItem } from '../types';

export const geWalletToken = (
  tokenItem: TokenItem,
  campaigns: CampaignState[],
  index: number,
  shortenHashes = true,
): WalletItem => {
  const { token, amount } = tokenItem;
  const campaign = campaigns[tokenItem.campaign];

  return {
    id: `wallet-item-${index}`,
    token: shortenHashes ? tokenName(token) : token,
    tokenAmount: amount,
    brandName: shortenHashes ? brandName(campaign.manager) : campaign.manager,
  };
};

export const getWalletBalance = async (shortenHashes = true) => {
  const mints = await listMints();
  const burns = await listBurns();

  const reducedMints = reduceByToken(mints);
  const reducedBurns = reduceByToken(burns);

  const campaigns = await listCampaigns();

  const walletBalance = calculateWalletBalance(reducedMints, reducedBurns).map((it, idx) =>
    geWalletToken(it, campaigns, idx, shortenHashes),
  );

  return walletBalance;
};

export const calculateWalletBalance = (mints: TokenItem[], burns: TokenItem[]) => {
  const mintBalance = mints
    .map((m) => {
      const burnsAmount = burns
        .filter((b) => b.token === m.token)
        .map((b) => b.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      return { ...m, amount: m.amount - burnsAmount };
    })
    .reduce((acc: TokenItem[], currentValue) => {
      // Find if the acc already has an object with the same type
      const existing = acc.find((item) => item.token === currentValue.token);

      if (existing) {
        existing.amount += currentValue.amount;
      } else {
        acc.push({ ...currentValue });
      }

      return acc;
    }, []);

  const walletBalance = [...mintBalance].filter((item: TokenItem) => item.amount);
  return walletBalance;
};

export const reduceByToken = (tokensList: TokenEvent[]) => {
  const reducedByToken = tokensList.reduce<TokenItem[]>((acc, item) => {
    const existing = acc.find((i) => i.token === item.token);
    if (existing) {
      existing.amount += item.amount;
    } else {
      acc.push({ token: item.token, campaign: item.campaign, amount: item.amount });
    }
    return acc;
  }, []);

  return reducedByToken;
};
