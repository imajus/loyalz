'use client';

import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';
import { useState } from 'react';

import { GoBackButton, MainWrapper } from '@/shared/components';
import { useWeb3Auth } from '@/shared/hook';
import { fetchReceiptData } from '@/shared/utils/fdo';
import { addReceipt, listCampaigns } from '@/shared/utils/rollup';
import { toastInfo, toastSuccess } from '@/shared/utils/toast';
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
  const { provider } = useWeb3Auth();

  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    const scannedData = result?.data;
    setScannedResult(scannedData);

    const linkUrl = scannedData;

    try {
      const campaigns = await listCampaigns();
      fetchReceiptData(linkUrl)
        .then(async (receipts) => {
          if (!receipts?.length) return;
          const receipt = receipts[0];
          const item = receipt.items.find((item) =>
            campaigns.find((campaign) => {
              if (item.sku === campaign.sku) {
                return true;
              }
              return false;
            }),
          );
          if (item) {
            const campaign = campaigns.find((campaign) => campaign.sku === item.sku);

            if (!provider) return;

            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();

            await addReceipt(
              {
                id: receipt.id,
                sku: item.sku,
                quantity: '1',
              },
              signer,
            );

            toastSuccess(`Successfull added receipt for ${campaign?.name}`);
          } else {
            toastInfo('Unsupported type of receipt');
            router.push('/customer/earn');
          }
        })
        .catch((e) => {
          console.error(`fetchReceiptData failed with ${e}`);
        });
    } catch (error) {
      console.error(`scanning failed with ${error}`);
    }
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
