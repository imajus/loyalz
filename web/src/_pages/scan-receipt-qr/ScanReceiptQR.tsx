'use client';

import { useRouter } from 'next/navigation';

import { Button, Frame, MainWrapper } from '@/shared/components';

export const ScanReceiptQR = () => {
  const router = useRouter();

  return (
    <MainWrapper title="Scan QR" page="earn">
      <div
        className="grid gap-6 overflow-y-scroll overflow-x-hidden h-full pt-32"
        style={{ scrollbarWidth: 'none' }}
      >
        <Frame>
          <div className="h-80 w-80"></div>
        </Frame>
      </div>
      <div className="flex items-center justify-center h-20 w-full">
        <Button onClick={() => router.push('/earn', { scroll: false })} title="Go Back" />
      </div>
    </MainWrapper>
  );
};
