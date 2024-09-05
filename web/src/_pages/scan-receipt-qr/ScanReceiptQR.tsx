'use client';

import { Frame, GoBackButton, MainWrapper } from '@/shared/components';
import { fetchReceiptData } from '@/shared/utils/fdo';
import { useRouter } from 'next/navigation';

void (async () => {
  console.log(
    await fetchReceiptData(
      'https://consumer.oofd.kz/?i=2936414372&f=010100886168&s=3247.00&t=20240613T191146',
    ),
  );
})();

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
        <GoBackButton handleClick={() => router.push('/customer/earn', { scroll: false })} />
      </div>
    </MainWrapper>
  );
};
