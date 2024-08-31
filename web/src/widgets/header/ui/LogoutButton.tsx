'use client';

import { DoorOpen } from '@/shared/assets';
import { Button } from '@/shared/components';
import { useWeb3Auth } from '@/shared/hook/';

export const LogoutButton = () => {
  const { loginWeb3Auth, logoutWeb3Auth, isLoggedIn } = useWeb3Auth();

  return (
    <Button
      title={isLoggedIn ? 'Logout' : 'Login'}
      onClick={async () => {
        if (isLoggedIn) await logoutWeb3Auth?.();
        if (!isLoggedIn) await loginWeb3Auth?.();
      }}
      className="relative flex flex-col-reverse items-center justify-center font-bold text-xs font-['Radio_Canada']"
      hasBorder={false}
    >
      <DoorOpen />
    </Button>
  );
};
