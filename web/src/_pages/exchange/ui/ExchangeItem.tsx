import indefinite from 'indefinite';

import { Button, Frame, Icon } from '@/shared/components';
import { Product as ProductType } from '@/shared/types';
import { toastInfo } from '@/shared/utils/toast';

type PropTypes = {
  product: ProductType;
};

const icon =
  'https://images.unsplash.com/photo-1704394516937-306c24209cfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const ExchangeItem = ({ product }: PropTypes) => {
  const isExchangeable = product.price > 200;

  return (
    <div className="w-full flex flex-col items-center justify-center text-gray-600 gap-2 pr-[1px]">
      <span className="font-['Radio_Canada'] text-sm text-black font-bold">{product.company}</span>
      <Frame>
        <div className="flex flex-col w-full">
          <div className="flex flex-col sm:flex-row p-3 w-full items-center">
            <Icon src={icon} />
            <div className="flex flex-col gap-1 p-1 items-center sm:items-start">
              <span className="text-sm font-bold">{`Buy ${indefinite(product.productName)}`}</span>
              <span className="capitalize text-xs">{`+ ${product.price} ${product.priceUnit}`}</span>
            </div>
          </div>
          {isExchangeable && (
            <div className="w-full flex justify-end">
              <Button title="Exchange" onClick={() => toastInfo('exchange')} />
            </div>
          )}
        </div>
      </Frame>
    </div>
  );
};
