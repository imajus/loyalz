import Image from 'next/image';

import { Product as ProductType } from '@/shared/types';

type PropTypes = {
  product: ProductType;
};

const icon =
  'https://images.unsplash.com/photo-1704394516937-306c24209cfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Product = ({ product }: PropTypes) => {
  return (
    <div className="h-60 w-full flex flex-col items-center justify-center text-gray-600 gap-2">
      <span className="text-lg font-bold">{product.company}</span>
      <div className="flex flex-col sm:flex-row p-3 w-full items-center border rounded-2xl">
        <Image
          src={icon}
          alt="avatar"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-[50%] w-[100px] h-[100px] shadow-2xl bg-sapphire-blue-60%"
        />
        <div className="flex flex-col gap-3 p-1 items-center sm:items-start">
          <span>{`Buy ${product.productName}`}</span>
          <span className="capitalize">{`${product.price} ${product.priceUnit}`}</span>
        </div>
      </div>
    </div>
  );
};
