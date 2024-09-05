import Image from 'next/image';

import Logo from '@/shared/assets/logo.png';

import { LogoutButton } from './ui/LogoutButton';

type PropTypes = {
  title: string;
};

export const Header = ({ title }: PropTypes) => {
  return (
    <header className="flex flex-col shrink-0 items-center justify-start w-full h-[144px] gap-6">
      <div className="flex items-center justify-between border-b-[1px] bg-[#5BC8D6] w-full h-[82px] rounded-b-3xl px-7">
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
      <h3 className="text-4xl font-semibold text-center font-['Racing_Sans_One'] text-black">
        {title}
      </h3>
    </header>
  );
};
