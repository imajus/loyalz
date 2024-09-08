import { useRouter } from 'next/navigation';

import { Button, DoneMessageRetailer, GoBackButton } from '@/shared/components';

type PropTypes = {
  token: string;
  amount: number;
  brand: string;
  handleBackClick: () => void;
};

export const ExchangeConfirmedMessage = ({ token, amount, brand, handleBackClick }: PropTypes) => {
  const router = useRouter();

  return (
    <DoneMessageRetailer>
      <div className="w-full h-full flex flex-col items-center justify-between gap-3">
        <div className="w-full h-full flex flex-col items-center justify-start gap-3">
          <span className="text-[35px] text-center">{`Bravo! You've receieved ${amount} ${token} from ${brand}.`}</span>
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
