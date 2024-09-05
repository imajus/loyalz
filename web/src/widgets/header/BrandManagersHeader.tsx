import Image from 'next/image';

import Logo from '@/shared/assets/logo.png';

import { LogoutButton } from './ui/LogoutButton';

export const BrandManagersHeader = () => {
  return (
    <header className="flex flex-col shrink-0 items-center justify-start w-full h-[144px]">
      <div className="flex items-center justify-between w-full h-[82px] px-7">
        <div className="relative flex flex-col flex-shrink-0 items-center justify-center">
          <Image
            src={Logo}
            alt="avatar"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[28px] h-[28px]"
          />
          <span className="font-bold text-lg text-black">Loyalz</span>
        </div>

        <div className="text-black">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};
