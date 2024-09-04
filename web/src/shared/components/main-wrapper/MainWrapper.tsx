'use client';
import { ReactNode, useEffect, useState } from 'react';

import { ErrorMessage, GoBackButton, Spinner } from '@/shared/components';
import { Page } from '@/shared/types';
import { Footer, Header } from '@/widgets';

type PropTypes = {
  title: string;
  children: ReactNode;
  page: Page;
  isError?: boolean;
  isLoading?: boolean;
};
export const MainWrapper = ({ title, children, isLoading, isError = false, page }: PropTypes) => {
  const [hasError, setHasError] = useState(isError);

  useEffect(() => {
    setHasError(isError);
  }, [isError]);

  if (hasError) {
    return (
      <div className="flex flex-col w-full h-full ">
        <Header title={title} />
        <div className="relative flex-grow p-2 px-5 flex flex-col items-center justify-between gap-3 h-full w-full">
          <ErrorMessage />
          <div className="flex items-center justify-center h-20 w-full">
            <GoBackButton handleClick={() => setHasError(false)} />
          </div>
        </div>
        <Footer currentPage={page} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full ">
      <Header title={title} />
      <div className="relative  flex-grow min-h-0 p-2 px-5 flex flex-col gap-3">
        {isLoading ? <Spinner /> : children}
      </div>
      <Footer currentPage={page} />
    </div>
  );
};
