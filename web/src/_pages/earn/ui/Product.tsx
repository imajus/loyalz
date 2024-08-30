'use client';
import indefinite from 'indefinite';
import Image from 'next/image';

import { Button } from '@/shared/components';
import { Product as ProductType } from '@/shared/types';
import { toastSuccess } from '@/shared/utils/toast';

type PropTypes = {
  product: ProductType;
};

const icon =
  'https://images.unsplash.com/photo-1704394516937-306c24209cfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Product = ({ product }: PropTypes) => {
  // <div className="flex flex-col sm:flex-row p-3 w-full items-center border rounded-2xl">
  return (
    <div className="h-60 w-full flex flex-col items-center justify-center text-gray-600 gap-2">
      <span className="text-lg font-bold">{product.company}</span>
      <Button
        onClick={() => toastSuccess(`Bought ${product.productName}`)}
        className="relative text-black font-['Radio_Canada'] p-3 rounded-xl flex flex-row items-center justify-start cursor-pointer border-2 border-black shadow-sm w-full gap-2"
        btnType="grid"
      >
        <Image
          src={icon}
          alt="avatar"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-[50%] w-[48px] h-[48px] shadow-2xl bg-sapphire-blue-60%"
        />
        <div className="flex flex-col gap-1 p-1 items-center sm:items-start">
          <span className="text-sm font-bold">{`Buy ${indefinite(product.productName)}`}</span>
          <span className="capitalize text-xs">{`+ ${product.price} ${product.priceUnit}`}</span>
        </div>
      </Button>
    </div>
  );
};
