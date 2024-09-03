import { CampaignState, TokenEvent, TransactionItem } from '../types';

export const shortHash = (hash: string) => {
  return `${hash.slice(2, 4)}..${hash.slice(-2)}`;
};

export const productName = (sku: string) => {
  if (sku.length < 5) return sku;

  return shortHash(sku);
};

export const brandName = (manager: string) => {
  if (manager.length < 5) return manager;

  return shortHash(manager);
};

export const tokenName = (address: string) => {
  if (address.length < 5) return address;

  return shortHash(address);
};

export const getMintTransaction = (
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

export const getBurnTransaction = (
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
