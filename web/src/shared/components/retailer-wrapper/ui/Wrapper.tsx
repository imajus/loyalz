import { ReactNode } from 'react';

import { Header } from '@/widgets';

type WrapperPropTypes = {
  title: string;
  children: ReactNode;
};

export const Wrapper = ({ title, children }: WrapperPropTypes) => {
  return (
    <div className="flex flex-col w-full h-full sm:w-96 bg-white sm:rounded-2xl ">
      <Header title={title} />
      {children}
    </div>
  );
};
