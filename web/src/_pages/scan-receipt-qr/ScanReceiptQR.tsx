'use client';

import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';
import { useState } from 'react';

import { GoBackButton, MainWrapper } from '@/shared/components';
import { QRScanner } from '@/widgets';

import { Result } from './ui/Result';

// void (async () => {
//   console.log(
//     await fetchReceiptData(
//       'https://consumer.oofd.kz/?i=2936414372&f=010100886168&s=3247.00&t=20240613T191146',
//     ),
//   );
// })();

export const ScanReceiptQR = () => {
  const router = useRouter();
  const [scannedResult, setScannedResult] = useState<string | undefined>();

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    const scannedData = result?.data;
    setScannedResult(scannedData);
  };

  const onScanFail = (err: string | Error) => {
    const error = err as string;
    if (error.trim() === 'No QR code found') return;
    console.error(`Scanning QR failed:1 ${error}`);
  };

  return (
    <MainWrapper title="Scan QR" page="earn">
      <QRScanner
        scannedResult={scannedResult}
        setScannedResult={setScannedResult}
        onScanSuccess={onScanSuccess}
        onScanFail={onScanFail}
      />
      <Result scannedResult={scannedResult} />

      <div className="flex items-center justify-center h-20 w-full">
        <GoBackButton handleClick={() => router.push('/customer/earn', { scroll: false })} />
      </div>
    </MainWrapper>
  );
};
