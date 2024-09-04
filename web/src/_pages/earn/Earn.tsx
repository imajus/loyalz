'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

import { products } from '@/mock/products';
import { Button, DoneMessage, GoBackButton, MainWrapper } from '@/shared/components';

import { Product } from './ui/Product';

const Message = ({ children }: { children: ReactNode }) => {
  return <DoneMessage>{children}</DoneMessage>;
};

export const Earn = () => {
  const router = useRouter();
  const [isDone, setIsDone] = useState(false);

  if (isDone) {
    return (
      <MainWrapper title="Earn" page="earn">
        <Message>
          <div className="h-full w-full flex flex-col items-center justify-between py-3">
            <div className="text-[35px] text-black text-center flex flex-col">
              <span>You are now eligible</span>
              <span>to receive a</span>
              <span>&quot;Chocolate&quot;</span>
            </div>
            <GoBackButton handleClick={() => setIsDone(false)} />
          </div>
        </Message>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper title="Earn" page="earn">
      <div
        className="grid m-5 gap-6 overflow-y-scroll overflow-x-hidden h-full"
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
        onClick={() => setIsDone(true)}
      >
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div className="flex items-center justify-center h-20 w-full">
        <Button
          onClick={() => router.push('scan-receipt-qr', { scroll: false })}
          title="Scan receipt QR"
        />
      </div>
    </MainWrapper>
  );
};
