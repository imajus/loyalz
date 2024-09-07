import QrScanner from 'qr-scanner';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ScannerButton } from '@/_pages/scan-receipt-qr/ui/ScannerButton';
import { Frame, ScannerQR as ScannerQRComponent } from '@/shared/components';

type PropTypes = {
  onScanSuccess: (result: QrScanner.ScanResult) => void;
  onScanFail: (err: string | Error) => void;
  scannedResult: string | undefined;
  setScannedResult: Dispatch<SetStateAction<string | undefined>>;
};

export const QRScanner = ({
  onScanSuccess,
  onScanFail,
  scannedResult,
  setScannedResult,
}: PropTypes) => {
  const [isScannerOn, setIsScannerOn] = useState(false);

  useEffect(() => {
    if (!scannedResult) return;
    setIsScannerOn(false);
  }, [scannedResult]);

  const handleScannerClick = () => {
    setIsScannerOn(true);
    setScannedResult('');
  };

  return (
    <div
      className="grid gap-6 overflow-x-hidden justify-center items-center"
      style={{ scrollbarWidth: 'none' }}
    >
      <Frame isWidthFit>
        {isScannerOn ? (
          <ScannerQRComponent onScanSuccess={onScanSuccess} onScanFail={onScanFail} />
        ) : (
          <ScannerButton onClick={handleScannerClick} />
        )}
      </Frame>
    </div>
  );
};
