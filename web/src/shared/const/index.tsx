import { ReactNode } from 'react';

import { ArrowLeftRight, Globe, HandCoins, Newspaper } from '@/shared/assets';
import { Page } from '@/shared/types';

export const appName = 'Loyalz';
export const appUrl = 'https://example.com';

export const pages: Page[] = ['earn', 'wallet', 'news', 'exchange'];
export const pageIcons: Record<Page, ReactNode> = {
  earn: <HandCoins />,
  wallet: <Globe />,
  exchange: <ArrowLeftRight />,
  news: <Newspaper />,
};
