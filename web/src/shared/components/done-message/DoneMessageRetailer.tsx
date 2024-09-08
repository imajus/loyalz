import { ReactNode } from 'react';

import { GreenEllipseWithCheck } from '@/shared/icon';

type PropTypes = {
  children: ReactNode;
};

export const DoneMessageRetailer = ({ children }: PropTypes) => {
  return (
    <div className="flex flex-col gap-7 items-center justify-center h-full w-full p-5">
      <GreenEllipseWithCheck />

      {children}
    </div>
  );
};
