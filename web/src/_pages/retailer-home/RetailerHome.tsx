'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { Button, Icon, RetailerWrapper } from '@/shared/components';
import { useWeb3Auth } from '@/shared/hook';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <RetailerWrapper title="Menu">
      <div className="w-full h-full flex flex-col justify-start items-center gap-7 pt-10">
        {children}
      </div>
    </RetailerWrapper>
  );
};

export const RetailerHome = () => {
  const { isLoggedIn, loginWeb3Auth, web3user } = useWeb3Auth();
  const router = useRouter();

  if (!isLoggedIn || !web3user) {
    return (
      <Wrapper>
        <Button onClick={() => loginWeb3Auth?.()} title="Login" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="flex flex-col gap-3 items-center justify-center">
        <Icon src={web3user.profileImage} />
        <span className="font-bold">{web3user.name}</span>
      </div>
      <Button
        onClick={() => router.push('/retailer/scan-qr-exchange')}
        title="Scan QR for Exchange"
      />
    </Wrapper>
  );
};
