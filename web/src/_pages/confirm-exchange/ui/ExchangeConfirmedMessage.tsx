import { useRouter } from 'next/navigation';

import { Button, DoneMessageRetailer, GoBackButton } from '@/shared/components';
import { getManager, getToken } from '@/shared/utils/token';

type PropTypes = {
  tokens: {
    token: string;
    amount: number;
  }[];
  brand: string;
  handleBackClick: () => void;
};

export const ExchangeConfirmedMessage = ({ tokens, brand, handleBackClick }: PropTypes) => {
  const router = useRouter();

  const tokensString =
    tokens.length === 2
      ? `Bravo! You've receieved ${tokens[0].amount} ${getToken(tokens[0].token)} and ${tokens[1].amount} ${getToken(tokens[1].token)} from ${getManager(brand)}.`
      : `Bravo! You've receieved ${tokens[0].amount} ${getToken(tokens[0].token)} from ${getManager(brand)}.`;

  return (
    <DoneMessageRetailer>
      <div className="w-full h-full flex flex-col items-center justify-between gap-3">
        <div className="w-full h-full flex flex-col items-center justify-start gap-3">
          <span className="text-[35px] text-center">{tokensString}</span>
          <span className="text-sm text-center">
            See transaction details <button className="underline">on chain</button>
          </span>
        </div>
        <Button
          onClick={() => router.push('/customer/history', { scroll: false })}
          title="View in history"
        />
        <GoBackButton handleClick={handleBackClick} />
      </div>
    </DoneMessageRetailer>
  );
};
