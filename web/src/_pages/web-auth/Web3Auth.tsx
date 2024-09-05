'use client';
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { Button, MainWrapper, RootWrapper, Spinner } from '@/shared/components';
import { useWeb3Auth } from '@/shared/hook/';
import { SecuredPage } from '@/shared/types';

import { RPCButtons } from './ui/rpc-buttons';

const Wrapper = ({
  children,
  isError,
  redirectUrl,
}: {
  children: ReactNode;
  isError: boolean;
  redirectUrl: SecuredPage;
}) => {
  if (redirectUrl.startsWith('customer')) {
    return (
      <MainWrapper isError={isError} title="Web 3 Auth" page="">
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-5">
          {children}
        </div>
      </MainWrapper>
    );
  }

  if (redirectUrl.startsWith('brand-manager')) {
    return (
      <RootWrapper isError={isError}>
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-5">
          {children}
        </div>
      </RootWrapper>
    );
  }

  return null;
};

export const Web3AuthPage = () => {
  const { loginWeb3Auth, isLoggedIn, web3user, isError, isLoading, setIsLoading } = useWeb3Auth();
  const queryParams = useSearchParams();
  const redirectUrl = queryParams.get('redirectUrl') as SecuredPage;
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !redirectUrl) return;
    setIsLoading?.(true);
    router.push(`/${redirectUrl}`, { scroll: false });
    setIsLoading?.(false);
  }, [router, isLoggedIn, redirectUrl, setIsLoading]);

  if (!isLoggedIn) {
    return (
      <Wrapper isError={isError} redirectUrl={redirectUrl}>
        <Button onClick={() => loginWeb3Auth?.()} title="Login" />
      </Wrapper>
    );
  }

  if (isLoading) {
    <Wrapper isError={isError} redirectUrl={redirectUrl}>
      <Spinner />
    </Wrapper>;
  }

  return (
    <Wrapper isError={isError} redirectUrl={redirectUrl}>
      <div className="flex items-center justify-center flex-shrink-0 font-['Radio_Canada'] text-3xl text-black font-bold">
        {`User: ${web3user?.name}`}
      </div>

      <RPCButtons />
    </Wrapper>
  );
};
