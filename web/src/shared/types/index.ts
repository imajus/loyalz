export type Page = 'wallet' | 'earn' | 'exchange' | 'news' | 'manager' | '';
export type SecuredPage =
  | 'customer/wallet'
  | 'customer/earn'
  | 'customer/exchange'
  | 'customer/news'
  | 'manager'
  | '';

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
  token: string;
  tokenAmount: number;
  type: 'burn' | 'mint';
  timestamp: number;
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
  timestamp: number;
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

export type Campaign = {
  name: string;
  productName: string;
  brandName: string;
  mintToken: string;
  mintAmount: number;
  reward: string;
  otherToken: string;
  otherAmount: number;
  retailers: string[];
  active: boolean;
};

export type Token = {
  token: string;
  blockchain: string;
};

export type IndexedToken = {
  id: string;
  name: string;
};
