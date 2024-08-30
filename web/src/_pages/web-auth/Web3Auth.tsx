'use client';
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

import { ReactNode, useEffect, useState } from 'react';

import { Button, MainWrapper, Spinner } from '@/shared/components';
import { useAuth } from '@/shared/hook/useAuth/useAuth';
import { useAppSelector } from '@/shared/store/hook';
import { userSelector } from '@/shared/store/selector/user';
import { getUserInfo } from '@/shared/utils/web3Auth';
import { IProvider, UserInfo } from '@web3auth/base';

import { web3auth } from './config';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [user, setUser] = useState<Partial<UserInfo | null>>(null);
  const currentUser = useAppSelector(userSelector);
  const { login } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!currentUser?.idToken && !currentUser?.oAuthAccessToken) {
      setIsLoggedIn(false);
      setProvider(null);
    }
  }, [currentUser, isLoading]);

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        if (!Object.keys(web3auth.walletAdapters).length) {
          await web3auth.initModal();
        }
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setIsLoggedIn(true);
          const user = await getUserInfo(web3auth);
          setUser(user);
        }
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => setIsLoading(false), 500);
    };

    void init();
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <div
          className="absolute h-full w-full top-0 left-0 bg-white/80"
          onClick={(e) => e.stopPropagation()}
        >
          <Spinner />
        </div>
      </Wrapper>
    );
  }

  if (!isLoggedIn) {
    return (
      <Wrapper>
        <Button onClick={() => login(web3auth, setProvider, setIsLoggedIn)} title="Login" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="flex items-center justify-center flex-shrink-0 font-['Radio_Canada'] text-3xl text-black font-bold">
        {`User: ${user?.name}`}
      </div>

      <RPCButtons
        provider={provider}
        setProvider={setProvider}
        setLoggedIn={setIsLoggedIn}
        web3auth={web3auth}
      />
    </Wrapper>
  );
};
