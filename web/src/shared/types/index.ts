export type Page = 'wallet' | 'earn' | 'exchange';
export type Product = {
  id: string;
  company: string;
  productName: string;
  price: number;
  priceUnit: string;
};

export type WalletBalanceItem = {
  company: string;
  sum: number;
  unit: string;
};
