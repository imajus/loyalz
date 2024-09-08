import { ReactNode } from 'react';

import { ArrowLeftRight, Globe, HandCoins, Newspaper } from '@/shared/assets';
import { Page, SecuredPage } from '@/shared/types';

export const appName = 'Loyalz';
export const appUrl = 'https://example.com';

export const customerPages: Page[] = ['earn', 'wallet', 'news', 'exchange'];
export const brandManagerPages: Page[] = ['manager'];
export const pageIcons: Record<Page, ReactNode> = {
  earn: <HandCoins />,
  wallet: <Globe />,
  exchange: <ArrowLeftRight />,
  news: <Newspaper />,
  manager: null,
  '': null,
};

export const securedPages: SecuredPage[] = [
  'customer/wallet',
  'customer/exchange',
  'customer/news',
  'manager',
];

export const tokenMapping: { [key: string]: string } = {
  '88882:0x7556403BaC4Bb71F09f3b3C2Fdb6f9C461CAe712': 'RCC',
  '2810:0x4a68cb5b99b6e1db5745eeabde38c5b12aa0ce55': 'RCRC',
};
