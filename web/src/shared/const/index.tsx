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
