import '@/shared/style/globals.css';

import { ReactNode } from 'react';

import { Toast } from '@/shared/components';
import { Header } from '@/widgets';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Napkin Contract',
  description: 'Greatest app for signing contracts in blockchain world',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />

      {children}
      <Toast />
    </>
  );
}
