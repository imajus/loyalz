import '@/shared/style/globals.css';

import { ReactNode } from 'react';

import StoreProvider from '@/shared/store/provider';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Loyalz',
  description: 'Loyalty programs management platform for web3',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col gap-3 items-center justify-center h-[100dvh] w-screen">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
