import '@/shared/style/globals.css';

import { ReactNode } from 'react';

import { Toast } from '@/shared/components';

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
    <>
      {children}
      <Toast />
    </>
  );
}
