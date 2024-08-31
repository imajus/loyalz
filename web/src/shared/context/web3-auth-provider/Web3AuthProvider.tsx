'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { clientId, privateKeyProvider } from '@/_pages/web-auth/config';
import { Web3User } from '@/shared/types';
import { getLocalUserInfo, storeUserInfo } from '@/shared/utils/localStorage';
import { getUserInfo, getUserIsAuthenticated } from '@/shared/utils/web3Auth';
import { IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

type PropTypes = {
  children: ReactNode;
};

type Web3AuthData = {
  web3auth: Web3Auth | null;
  isLoggedIn: boolean;
  web3user: Web3User | null;
  isLoading: boolean;
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>;
  provider: IProvider | null;
  setProvider?: Dispatch<SetStateAction<IProvider | null>>;
  loginWeb3Auth?: () => Promise<void>;
  logoutWeb3Auth?: () => Promise<void>;
};

const initialWeb3AuthData = {
  web3auth: null,
  web3user: null,
  isLoggedIn: false,
  provider: null,
  isLoading: false,
};

export const Web3AuthContext = createContext<Web3AuthData>(initialWeb3AuthData);

export const Web3AuthProvider = ({ children }: PropTypes) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [web3user, setWeb3user] = useState<Web3User | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void loginWeb3Auth();
  }, []);

  const loginWeb3Auth = async () => {
    setIsLoading(true);

    let w3auth = web3auth;
    if (!w3auth) {
      const web3auth = new Web3Auth({
        clientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        privateKeyProvider,
      });

      setWeb3auth(web3auth);

      w3auth = web3auth;
    }

    try {
      if (!Object.keys(w3auth.walletAdapters).length) {
        await w3auth.initModal();
      }

      if (!w3auth.connected) {
        const web3authProvider = await w3auth.connect();
        setProvider(web3authProvider);
      }

      const currentUser = getLocalUserInfo();

      if (getUserIsAuthenticated(currentUser)) {
        setWeb3user(currentUser);
        setIsLoggedIn(true);
      } else {
        const user = (await getUserInfo(web3auth)) as Web3User;
        if (user) {
          setWeb3user(user);
          storeUserInfo(user);
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const logoutWeb3Auth = async () => {
    if (!web3auth) return;

    await web3auth.logout();
    setProvider?.(null);
    setIsLoggedIn?.(false);
    storeUserInfo(null);
  };

  const web3AuthData: Web3AuthData = {
    web3auth,
    web3user,
    isLoggedIn,
    isLoading,
    provider,
    loginWeb3Auth,
    logoutWeb3Auth,
  };

  return <Web3AuthContext.Provider value={web3AuthData}>{children}</Web3AuthContext.Provider>;
};
