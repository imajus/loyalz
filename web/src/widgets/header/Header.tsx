import Link from 'next/link';

import { Logo } from '@/shared/icon';

export const Header = () => {
  return (
    <header className="flex flex-col shrink-0 items-center justify-center border-b-[1px] border-b-gray-400 w-full h-16">
      <Link href="/" className="cursor-pointer">
        <Logo height={30} />
      </Link>
    </header>
  );
};
