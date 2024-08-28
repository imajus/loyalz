export type Page = 'wallet' | 'earn' | 'exchange' | 'history';
export type Product = {
  id: string;
  company: string;
  productName: string;
  price: number;
  priceUnit: string;
};
export type TransactionItem = {
  id: string;
  tokenCompany: string;
  productName: string;
  sum: number;
  priceUnit: string;
  date: string;
};

export type WalletBalanceItem = {
  company: string;
  sum: number;
  unit: string;
};
