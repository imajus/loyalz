export type Page = 'wallet' | 'earn' | 'exchange' | 'news' | '';

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
