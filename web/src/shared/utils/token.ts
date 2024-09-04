import { calculateWalletBalance } from '@/_pages/wallet/utils';

import { CampaignState, TokenEvent, TransactionItem } from '../types';
import { listBurns, listCampaigns, listMints } from './rollup';

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
  shortenHashes = true,
): TransactionItem => {
  const { token, amount } = mint;
  const campaign = campaigns[mint.campaign];

  return {
    id: `mint-${index}`,
    productName: shortenHashes ? productName(campaign.sku) : campaign.sku,
    sum: amount,
    token: shortenHashes ? tokenName(token) : token,
    brandName: shortenHashes ? brandName(campaign.manager) : campaign.manager,
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

export const getWalletBalance = async (shortenHashes = true) => {
  const mints = await listMints();
  const burns = await listBurns();
  const campaigns = await listCampaigns();

  const walletBalance = calculateWalletBalance(mints, burns).map((tr, idx) =>
    getMintTransaction(tr, campaigns, idx, shortenHashes),
  );

  return walletBalance;
};

export const getTokensLeftForExchangingMint = (
  mint: CampaignState,
  walletBalance: TransactionItem[],
) => {
  const { mintToken, mintAmount, otherToken, otherAmount } = mint;

  const walletItem = walletBalance.filter((item) => item.token === mintToken)?.[0];
  const tokensLeft = walletItem ? mintAmount - (walletItem?.sum || 0) : mintAmount;

  const otherWalletItem = walletBalance.filter((item) => item.token === otherToken)?.[0];
  const otherTokensLeft = otherAmount ? otherAmount - (otherWalletItem?.sum || 0) : 0;

  return { tokensLeft: Math.max(0, tokensLeft), otherTokensLeft: Math.max(0, otherTokensLeft) };
};
