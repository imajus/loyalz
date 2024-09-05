'use client';

import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';

import { Frame, GoBackButton, MainWrapper } from '@/shared/components';

export const ShowQR = () => {
  const router = useRouter();

  return (
    <MainWrapper title="Show QR" page="exchange">
      <div
        className="grid gap-6 overflow-y-scroll h-full pt-32 w-[280px] justify-center mx-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <Frame>
          <QRCode value="Loyalz is the app for loyality program" />,
        </Frame>
      </div>
      <div className="flex items-center justify-center h-20 w-full">
        <GoBackButton handleClick={() => router.push('/customer/exchange', { scroll: false })} />
      </div>
    </MainWrapper>
  );
};
