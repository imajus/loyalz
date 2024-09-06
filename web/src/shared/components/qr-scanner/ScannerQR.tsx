'use client';
/**
 * credit: https://dev.to/yusufginanjar/how-to-implement-qr-scanner-in-reactjs-ao7
 */

import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';

type PropTypes = {
  onScanSuccess: (result: QrScanner.ScanResult) => void;
  onScanFail: (err: string | Error) => void;
};

export const ScannerQR = ({ onScanSuccess, onScanFail }: PropTypes) => {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const [qrOn, setQrOn] = useState(true);

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      //Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: 'environment',
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, [videoEl, scanner]);

  useEffect(() => {
    // ❌ If "camera" is not allowed in browser permissions, show an alert.
    if (!qrOn)
      alert(
        'Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.',
      );
  }, [qrOn]);

  return (
    <div className="w-80 h-80">
      <video ref={videoEl} className="w-full h-full object-cover" />
    </div>
  );
};
