'use client';

import { products } from '@/mock/products';
import { Button, MainWrapper } from '@/shared/components';
import { toastInfo } from '@/shared/utils/toast';

import { Product } from './ui/Product';

export const Earn = () => {
  return (
    <MainWrapper title="Earn" page="earn">
      <div
        className="grid m-5 gap-6 overflow-y-scroll overflow-x-hidden h-full"
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
      >
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div className="flex items-center justify-center h-20 w-full">
        <Button onClick={() => toastInfo('scan re')} title="Scan receipt QR" />
      </div>
    </MainWrapper>
  );
};
