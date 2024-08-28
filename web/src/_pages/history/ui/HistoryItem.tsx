import moment from 'moment';

import { TransactionItem } from '@/shared/types';

type PropTypes = {
  item: TransactionItem;
};

const getSum = (item: TransactionItem, isExpense: boolean) => {
  return `${isExpense ? '' : '+'}${item.sum}`;
};

const getEarnedText = (item: TransactionItem, isExpense: boolean) => {
  if (isExpense) {
    return `Burned for ${item.productName}`;
  }
  return `Earned from ${item.productName}`;
};

export const HistoryItem = ({ item }: PropTypes) => {
  const isExpense = item.sum < 0;

  return (
    <div className="h-40 w-full flex flex-row items-start justify-center text-gray-600">
      <div className="flex flex-col gap-1 p-1 w-9/12">
        <span className="overflow-ellipsis whitespace-nowrap overflow-hidden">
          {getEarnedText(item, isExpense)}
        </span>
        <span className="overflow-ellipsis whitespace-nowrap overflow-hidden">{`${moment(item.date).format('LLL')}`}</span>
      </div>
      <div className="flex flex-col gap-1 p-1 w-3/12 items-end">
        <span>{getSum(item, isExpense)}</span>
        <span className="capitalize text-right">{`${item.priceUnit}`}</span>
        <span className="capitalize text-right text-xs">{`by ${item.tokenCompany}`}</span>
      </div>
    </div>
  );
};
