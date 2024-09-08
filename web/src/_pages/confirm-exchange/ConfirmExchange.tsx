'use client';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { Button, RetailerWrapper } from '@/shared/components';
import { GreenEllipseWithPresent, RedEllipse } from '@/shared/icon';

import { ExchangeConfirmedMessage } from './ui/ExchangeConfirmedMessage';

const Wrapper = ({
  children,
  isError,
  isDone,
  setIsDone,
}: {
  children: ReactNode;
  isDone: boolean;
  isError?: boolean;
  setIsDone: Dispatch<SetStateAction<boolean>>;
}) => {
  const doneMessage = (
    <ExchangeConfirmedMessage
      token="Pearls"
      amount={100}
      brand="Alpha"
      handleBackClick={() => setIsDone(false)}
    />
  );

  return (
    <RetailerWrapper title="Done" DoneMessage={doneMessage} isDone={isDone} isError={isError}>
      <div className="w-full h-full flex flex-col justify-between items-center gap-7 pt-10">
        {children}
      </div>
    </RetailerWrapper>
  );
};

const tokens = [
  { token: 'Pearls', amount: 1500 },
  { token: 'Diamonds', amount: 100 },
];
const gift = 'Teddy Bear';

const getTransactionText = (
  gift: string,
  tokens: {
    token: string;
    amount: number;
  }[],
) => {
  const tokenExchanged = tokens.map((it) => `${it.amount} ${it.token}`).join(', ');
  return `You will give a ${gift} for ${tokenExchanged}`;
};

export const ConfirmExchange = () => {
  const [isDone, setIsDone] = useState(false);
  const router = useRouter();

  const handleExchangeClick = () => {
    setIsDone(true);
  };

  return (
    <Wrapper isDone={isDone} setIsDone={setIsDone}>
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-row items-center justify-center gap-3">
          <GreenEllipseWithPresent />
          <ArrowRightIcon size={100} />

          <div className="flex flex-col gap-2">
            {tokens.map((_, index) => (
              <RedEllipse height={48} key={index} />
            ))}
          </div>
        </div>

        <span className="font-['Radio_Canada] text-[35px] text-center">
          {getTransactionText(gift, tokens)}
        </span>
      </div>

      <div className="flex items-center justify-center h-20 w-full gap-3">
        <Button onClick={handleExchangeClick} btnSize="sm">
          <span className="font-['Racing_Sans_One'] text-2xl">Exchange</span>
        </Button>
        <Button onClick={() => router.push('/retailer', { scroll: false })} btnSize="sm">
          <span className="font-['Racing_Sans_One'] text-2xl">Cancel</span>
        </Button>
      </div>
    </Wrapper>
  );
};
