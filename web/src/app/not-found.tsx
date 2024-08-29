import Link from 'next/link';

import { MainWrapper } from '@/shared/components';

export default function NotFound() {
  return (
    <div className="w-full h-full sm:w-96 bg-white sm:rounded-2xl flex flex-col justify-start items-center">
      <MainWrapper title="Wallet" page="wallet">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5">
          <span className="text-black text-2xl font-bold p-3 rounded-md">Page not found</span>
          <Link href="/" className="text-black text-3xl p-3 rounded-md border-2 border-black">
            Return Home
          </Link>
        </div>
      </MainWrapper>
    </div>
  );
}
