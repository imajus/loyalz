import indefinite from 'indefinite';

import { Frame, Icon } from '@/shared/components';
import { CampaignState } from '@/shared/types';
import { brandName, tokenName } from '@/shared/utils/token';

type PropTypes = {
  product: CampaignState;
};

const icon =
  'https://images.unsplash.com/photo-1704394516937-306c24209cfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Product = ({ product }: PropTypes) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-gray-600 gap-2 pr-[1px]">
      <span className="font-['Radio_Canada'] text-sm text-black font-bold">
        {brandName(product.manager)}
      </span>
      <Frame>
        <div className="flex flex-col w-full">
          <div className="flex flex-col sm:flex-row p-3 w-full items-center">
            <Icon src={icon} />
            <div className="flex flex-col gap-1 p-1 items-center sm:items-start">
              <span className="text-sm font-bold">{`${product.name}`}</span>
              <div className="flex items-center justify-center flex-wrap gap-3">
                <span className="text-xs">{`Buy ${indefinite(product.reward || '')} to get `}</span>
                <span className="capitalize text-xs">{`${product.mintAmount} ${tokenName(product.mintToken)}`}</span>
                {product.otherAmount && (
                  <>
                    <span className="text-xs">{`and ${product.otherAmount} ${tokenName(product.otherToken || '')}`}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
};
