import { ReactNode } from 'react';

import { Page } from '@/shared/types';
import { Footer, Header } from '@/widgets';

type WrapperPropTypes = {
  title: string;
  page: Page;
  children: ReactNode;
};

export const Wrapper = ({ title, page, children }: WrapperPropTypes) => {
  return (
    <div className="flex flex-col w-full h-full ">
      <Header title={title} />
      {children}
      <Footer currentPage={page} />
    </div>
  );
};
