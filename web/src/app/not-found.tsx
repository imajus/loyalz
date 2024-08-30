'use client';
import { usePathname } from 'next/navigation';

import { Button, MainWrapper } from '@/shared/components';
import { pages } from '@/shared/const';
import { Page } from '@/shared/types';
import { removeLeadingTrailingSlashes } from '@/shared/utils';

export default function NotFound() {
  const slug = removeLeadingTrailingSlashes(usePathname()) as Page;
  const page: Page = pages.includes(slug) ? slug : 'earn';
  return (
    <div className="w-full h-full sm:w-96 bg-white sm:rounded-2xl flex flex-col justify-start items-center">
      <MainWrapper title="Wallet" page={page}>
        <div className="h-full w-full flex flex-col items-center justify-center gap-5">
          <span className="text-black text-3xl font-bold p-3 rounded-md">Page not found</span>
          <Button href="/" title="Return Home" />
        </div>
      </MainWrapper>
    </div>
  );
}
