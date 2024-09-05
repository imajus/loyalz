export type Page = 'wallet' | 'earn' | 'exchange' | 'news' | 'brand-manager' | '';

export type Product = {
  id: string;
  company: string;
  productName: string;
  price: number;
  priceUnit: string;
};

export type NewsItem = {
  id: string;
  text: string;
  company: string;
  date: string;
};

export type TransactionItem = {
  id: string;
  brandName: string;
  productName: string;
  sum: number;
  token: string;
  type: 'burn' | 'mint';
};

export type WalletBalanceItem = {
  company: string;
  sum: number;
  unit: string;
};

export type Web3User = {
  appState: string;
  email: string;
  aggregateVerifier: string;
  name: string;
  profileImage: string;
  typeOfLogin: string;
  verifier: string;
  verifierId: string;
  dappShare: string;
  oAuthIdToken: string;
  oAuthAccessToken: string;
  isMfaEnabled: boolean;
  idToken: string;
};

export type CampaignState = {
  manager: string;
  name: string;
  sku: string;
  mintToken: string;
  mintAmount: number;
  reward?: string;
  otherToken?: string;
  otherAmount?: number;
  retailers: string[];
  active: boolean;
};

export type ReceiptState = {
  id: string;
  customer: string;
  sku: string;
  quantity: number;
  mints: number[];
};

export type TokenEvent = {
  campaign: number;
  customer: string;
  token: string;
  amount: number;
};

export type CreateCampaignInputs = {
  name: string;
  sku: string;
  mintToken: string;
  mintAmount: number;
  reward?: string;
  otherToken?: string;
  otherAmount?: number;
};

export type AlterRetailerInputs = {
  campaign: number;
  address: string;
};

export type AddReceiptInputs = {
  id: string;
  sku: string;
  quantity: number;
};

export type ClaimRewardInputs = {
  campaign: number;
  customer: string;
};
