import { WalletItem } from '@/_pages/wallet/types';
import { tokenMapping } from '@/shared/const';

import { Campaign, CampaignState, TokenEvent, TransactionItem } from '../types';

export const shortHash = (hash: string) => {
  return `${hash.slice(2, 4)}..${hash.slice(-2)}`;
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
  shortenHashes = true,
  prefix = 'mint',
): TransactionItem => {
  const { token, amount, timestamp } = mint;
  const campaign = campaigns[mint.campaign];

  return {
    id: `${prefix}-${index}`,
    productName: campaign.sku,
    token: shortenHashes ? tokenName(token) : token,
    tokenAmount: amount,
    brandName: shortenHashes ? brandName(campaign.manager) : campaign.manager,
    type: 'mint',
    timestamp,
  };
};

export const getCampaign = (campaign: CampaignState, shortenHashes = true): Campaign => {
  const {
    name,
    active,
    mintToken,
    mintAmount,
    manager,
    sku,
    reward,
    otherToken,
    otherAmount,
    retailers,
  } = campaign;

  return {
    name: name,
    productName: sku,
    brandName: shortenHashes ? brandName(manager) : manager,
    mintToken: shortenHashes ? tokenName(mintToken) : mintToken,
    mintAmount: mintAmount,
    reward: reward || '',
    otherToken: shortenHashes ? tokenName(otherToken || '') : otherToken || '',
    otherAmount: otherAmount || 0,
    retailers: retailers.map((r) => (shortenHashes ? tokenName(r) : r)),
    active: active,
  };
};

export const getBurnTransaction = (
  burn: TokenEvent,
  campaigns: CampaignState[],
  index: number,
): TransactionItem => {
  const { token, amount, timestamp } = burn;
  const campaign = campaigns[burn.campaign];

  return {
    id: `burn-${index}`,
    productName: campaign.reward || '',
    token: tokenName(token),
    tokenAmount: amount,
    brandName: brandName(campaign.manager),
    type: 'burn',
    timestamp,
  };
};

export const getTokensLeftForExchangingMint = (
  mint: CampaignState,
  walletBalance: WalletItem[],
) => {
  const { mintToken, mintAmount, otherToken, otherAmount } = mint;

  const walletItem = walletBalance.filter((item) => item.token === mintToken)?.[0];
  const tokensLeft = walletItem ? mintAmount - (walletItem?.tokenAmount || 0) : mintAmount;

  const otherWalletItem = walletBalance.filter((item) => item.token === otherToken)?.[0];
  const otherTokensLeft = otherAmount ? otherAmount - (otherWalletItem?.tokenAmount || 0) : 0;

  return { tokensLeft: Math.max(0, tokensLeft), otherTokensLeft: Math.max(0, otherTokensLeft) };
};

export const getToken = (token: string) => tokenMapping[token] || token;

export const getTokenSrc = (token: string) =>
  `https://n8n.majus.org/webhook/loyalz-cdn?kind=tokens&id=${token}`;
