import '@/shared/style/globals.css';

import { ReactNode } from 'react';

import { Toast } from '@/shared/components';
import { BrandManagersHeader } from '@/widgets';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Loyalz',
  description: 'Loyality app',
};

export default function BrandManagerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-start items-center">
      <BrandManagersHeader />
      {children}
      <Toast />
    </div>
  );
}
