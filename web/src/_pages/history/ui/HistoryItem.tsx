import { TransactionItem } from '@/shared/types';

type PropTypes = {
  item: TransactionItem;
};

const getSum = (item: TransactionItem) => {
  return `${item.type === 'burn' ? '' : '+'}${item.sum}`;
};

const getEarnedText = (item: TransactionItem) => {
  if (item.type === 'burn') {
    return `Burned for ${item.productName}`;
  }
  if (item.type === 'mint') {
    return `Earned from ${item.productName}`;
  }

  return '';
};

export const HistoryItem = ({ item }: PropTypes) => {
  return (
    <div className="h-40 w-full flex flex-row items-start justify-center text-gray-600">
      <div className="flex flex-col gap-1 p-1 w-9/12">
        <span className="overflow-ellipsis whitespace-nowrap overflow-hidden">
          {getEarnedText(item)}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-1 w-3/12 items-end">
        <span>{getSum(item)}</span>
        <span className="capitalize text-right">{`${item.token}`}</span>
        <span className="capitalize text-right text-xs">{`by ${item.brandName}`}</span>
      </div>
    </div>
  );
};
