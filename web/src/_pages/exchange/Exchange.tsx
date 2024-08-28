'use client';

import { products } from '@/mock/products';
import { MainWrapper } from '@/shared/components';

import { ExchangeItem } from './ui/ExchangeItem';

export const Exchange = () => {
  return (
    <MainWrapper title="Exchange" page="exchange">
      <div
        className="flex flex-col m-5 gap-6 overflow-y-scroll overflow-x-hidden h-full"
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
      >
        {products.map((product) => (
          <ExchangeItem key={product.id} product={product} />
        ))}
      </div>
    </MainWrapper>
  );
};
