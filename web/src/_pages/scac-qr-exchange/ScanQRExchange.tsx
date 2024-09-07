'use client';
import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';
import { ReactNode, useState } from 'react';

import { GoBackButton, RetailerUnAuthWrapper } from '@/shared/components';
import { QRScanner } from '@/widgets';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <RetailerUnAuthWrapper title="Menu">
      <div className="w-full flex flex-col justify-between items-center gap-7 pt-10">
        {children}
      </div>
    </RetailerUnAuthWrapper>
  );
};

export const ScanQRExchange = () => {
  const [scannedResult, setScannedResult] = useState<string | undefined>();
  const router = useRouter();

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
    <Wrapper>
      <QRScanner
        scannedResult={scannedResult}
        setScannedResult={setScannedResult}
        onScanSuccess={onScanSuccess}
        onScanFail={onScanFail}
      />

      <div className="flex items-center justify-center h-20 w-full">
        <GoBackButton handleClick={() => router.push('/retailer', { scroll: false })} />
      </div>
    </Wrapper>
  );
};
