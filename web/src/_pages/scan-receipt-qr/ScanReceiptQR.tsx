'use client';

import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';
import { useEffect, useState } from 'react';

import { Frame, GoBackButton, MainWrapper, ScannerQR } from '@/shared/components';
import { fetchReceiptData } from '@/shared/utils/fdo';

import { Result } from './ui/Result';
import { ScannerButton } from './ui/ScannerButton';

void (async () => {
  console.log(
    await fetchReceiptData(
      'https://consumer.oofd.kz/?i=2936414372&f=010100886168&s=3247.00&t=20240613T191146',
    ),
  );
})();

export const ScanReceiptQR = () => {
  const router = useRouter();
  const [scannedResult, setScannedResult] = useState<string | undefined>();
  const [isScannerOn, setIsScannerOn] = useState(false);

  useEffect(() => {
    if (!scannedResult) return;
    setIsScannerOn(false);
  }, [scannedResult]);

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    const scannedData = result?.data;
    setScannedResult(scannedData);
  };

  const onScanFail = (err: string | Error) => {
    const error = err as string;
    if (error.trim() === 'No QR code found') return;
    console.error(`Scanning QR failed:1 ${error}`);
  };

  const handleScannerClick = () => {
    setIsScannerOn(true);
    setScannedResult('');
  };

  return (
    <MainWrapper title="Scan QR" page="earn">
      <div
        className="grid gap-6 overflow-x-hidden h-full justify-center items-center"
        style={{ scrollbarWidth: 'none' }}
      >
        <Frame isWidthFit>
          {isScannerOn ? (
            <ScannerQR onScanSuccess={onScanSuccess} onScanFail={onScanFail} />
          ) : (
            <ScannerButton onClick={handleScannerClick} />
          )}
        </Frame>
      </div>

      <Result scannedResult={scannedResult} />

      <div className="flex items-center justify-center h-20 w-full">
        <GoBackButton handleClick={() => router.push('/customer/earn', { scroll: false })} />
      </div>
    </MainWrapper>
  );
};
