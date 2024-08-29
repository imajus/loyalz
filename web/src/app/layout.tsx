import '@/shared/style/globals.css';

import { ReactNode } from 'react';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Loyalz',
  description: 'Loyality app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col gap-3 items-center justify-center h-[100dvh] w-screen">
        <div className="w-full h-full sm:w-96 bg-white sm:rounded-2xl flex flex-col justify-start items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
