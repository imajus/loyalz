import Image from 'next/image';

import Logo from '@/shared/assets/logo.png';

import { LogoutButton } from './ui/LogoutButton';

type PropTypes = {
  title: string;
};

export const Header = ({ title }: PropTypes) => {
  return (
    <header className="flex flex-row shrink-0 items-center justify-center border-b-[1px] bg-[#5BC8D6] w-full h-[144px] rounded-b-3xl">
      <div className="relative w-1/3 flex flex-shrink-0 items-center justify-center">
        <Image
          src={Logo}
          alt="avatar"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[35px] h-[35px]"
        />
        <span className="absolute top-8 font-bold text-lg text-black">Loyalz</span>
      </div>

      <div className="h-full flex-grow flex flex-col items-end p-6 justify-end gap-3 text-black">
        <LogoutButton />
        <h3 className="text-4xl font-semibold text-center font-['Racing_Sans_One']">{title}</h3>
      </div>
    </header>
  );
};
