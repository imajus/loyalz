import { ReactNode } from 'react';

import { GreenEllipseWithCheck } from '@/shared/icon';

type PropTypes = {
  children: ReactNode;
};

export const DoneMessage = ({ children }: PropTypes) => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full w-full">
      <span className="text-black font-['Racing_Sans_One'] text-[40px]">Done</span>
      <GreenEllipseWithCheck />

      {children}
    </div>
  );
};
