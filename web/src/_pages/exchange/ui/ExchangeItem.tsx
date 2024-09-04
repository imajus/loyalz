import { Button, Frame, Icon } from '@/shared/components';
import { CampaignState, TransactionItem } from '@/shared/types';
import { toastInfo } from '@/shared/utils/toast';
import { brandName, getTokensLeftForExchangingMint, tokenName } from '@/shared/utils/token';

type PropTypes = {
  product: CampaignState;
  walletBalance: TransactionItem[];
};

const icon =
  'https://images.unsplash.com/photo-1704394516937-306c24209cfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const ExchangeItem = ({ product, walletBalance }: PropTypes) => {
  const tokensLeft = getTokensLeftForExchangingMint(product, walletBalance);
  const isExchangeable = !tokensLeft.otherTokensLeft && !tokensLeft.otherTokensLeft;

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
                <div className="flex flex-col gap-1 items-start justify-center">
                  <span className="capitalize text-xs">{`${product.mintAmount} ${tokenName(product.mintToken)}`}</span>
                  {!tokensLeft.tokensLeft ? null : (
                    <span className="capitalize text-xs">{`${tokensLeft.tokensLeft} left`}</span>
                  )}
                </div>
                {product.otherAmount && (
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <span className="capitalize text-xs">{`${product.otherAmount} ${tokenName(product.otherToken || '')}`}</span>
                    {!tokensLeft.otherTokensLeft ? null : (
                      <span className="capitalize text-xs">{`${tokensLeft.otherTokensLeft} left`}</span>
                    )}
                  </div>
                )}
              </div>
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
