'use client';
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

import { ReactNode } from 'react';

import { Button, MainWrapper } from '@/shared/components';
import { useWeb3Auth } from '@/shared/hook/';

import { RPCButtons } from './ui/rpc-buttons';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MainWrapper title="Web 3 Auth" page="">
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-5">
        {children}
      </div>
    </MainWrapper>
  );
};

export const Web3AuthPage = () => {
  const { loginWeb3Auth, isLoggedIn, web3user } = useWeb3Auth();

  if (!isLoggedIn) {
    return (
      <Wrapper>
        <Button onClick={() => loginWeb3Auth?.()} title="Login" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="flex items-center justify-center flex-shrink-0 font-['Radio_Canada'] text-3xl text-black font-bold">
        {`User: ${web3user?.name}`}
      </div>

      <RPCButtons />
    </Wrapper>
  );
};
