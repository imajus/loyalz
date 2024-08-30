import { Dispatch, SetStateAction } from 'react';

import { useAppDispatch } from '@/shared/store/hook';
import { login as loginAction, logout as logoutAction } from '@/shared/store/slice/user';
import { Web3User } from '@/shared/types';
import { getUserInfo } from '@/shared/utils/web3Auth';
import { IProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const login = async (
    web3auth: Web3Auth,
    setProvider?: Dispatch<SetStateAction<IProvider | null>>,
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>,
  ) => {
    const web3authProvider = await web3auth.connect();
    setProvider?.(web3authProvider);
    if (web3auth.connected) {
      setIsLoggedIn?.(true);
      const user = (await getUserInfo(web3auth)) as Web3User;
      dispatch(loginAction({ data: user }));
    }
  };

  const logout = async (
    web3auth: Web3Auth,
    setProvider?: Dispatch<SetStateAction<IProvider | null>>,
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>,
  ) => {
    await web3auth.logout();
    setProvider?.(null);
    setIsLoggedIn?.(false);
    dispatch(logoutAction());
  };

  return { login, logout };
};
