import '@/shared/style/globals.css';

import { ReactNode } from 'react';

import { Toast } from '@/shared/components';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Loyalz',
  description: 'Loyality app',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="w-full h-full sm:w-96 bg-white sm:rounded-2xl flex flex-col justify-start items-center">
      {children}
      <Toast />
    </div>
  );
}
