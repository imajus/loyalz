'use client';
import indefinite from 'indefinite';

import { Button, Icon } from '@/shared/components';
import { Product as ProductType } from '@/shared/types';
import { toastSuccess } from '@/shared/utils/toast';

type PropTypes = {
  product: ProductType;
};

const icon =
  'https://images.unsplash.com/photo-1704394516937-306c24209cfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Product = ({ product }: PropTypes) => {
  return (
    <div className="h-60 w-full flex flex-col items-center justify-center text-gray-600 gap-2 pr-[1px]">
      <span className="font-['Radio_Canada'] text-sm text-black font-bold">{product.company}</span>
      <Button
        onClick={() => toastSuccess(`Bought ${product.productName}`)}
        className="relative text-black font-['Radio_Canada'] p-3 rounded-xl flex flex-row items-center justify-start cursor-pointer border-2 border-black shadow-sm w-full gap-2"
        btnType="grid"
      >
        <Icon src={icon} />
        <div className="flex flex-col gap-1 p-1 items-center sm:items-start">
          <span className="text-sm font-bold">{`Buy ${indefinite(product.productName)}`}</span>
          <span className="capitalize text-xs">{`+ ${product.price} ${product.priceUnit}`}</span>
        </div>
      </Button>
    </div>
  );
};
