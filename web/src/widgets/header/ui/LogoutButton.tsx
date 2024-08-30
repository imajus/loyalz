'use client';
import { useEffect, useState } from 'react';

import { web3auth } from '@/_pages/web-auth/config';
import { DoorOpen } from '@/shared/assets';
import { Button } from '@/shared/components';
import { useAuth } from '@/shared/hook/useAuth/useAuth';
import { useAppDispatch, useAppSelector } from '@/shared/store/hook';
import { userSelector } from '@/shared/store/selector/user';
import { login as loginAction } from '@/shared/store/slice/user';
import { Web3User } from '@/shared/types';
import { getUserInfo } from '@/shared/utils/web3Auth';

export const LogoutButton = () => {
  const { login, logout } = useAuth();
  const currentUser = useAppSelector(userSelector);
  const [isLoggedId, setIsLoggedIn] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        if (!Object.keys(web3auth.walletAdapters).length) {
          await web3auth.initModal();
        }

        if (web3auth.connected) {
          setIsLoggedIn(true);
          const user = (await getUserInfo(web3auth)) as Web3User;
          dispatch(loginAction({ data: user }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    void init();
  }, [dispatch]);

  useEffect(() => {
    const isAuthenticated = !!(currentUser.idToken || currentUser.oAuthAccessToken);
    setIsLoggedIn(isAuthenticated);
  }, [currentUser]);

  return (
    <Button
      title={isLoggedId ? 'Logout' : 'Login'}
      onClick={async () => {
        if (isLoggedId) await logout(web3auth);
        if (!isLoggedId) await login(web3auth);
      }}
      className="relative flex flex-col-reverse items-center justify-center font-bold text-xs font-['Radio_Canada']"
      hasBorder={false}
    >
      <DoorOpen />
    </Button>
  );
};
