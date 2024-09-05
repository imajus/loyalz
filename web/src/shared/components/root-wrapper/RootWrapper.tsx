'use client';
import { ReactNode, useEffect, useState } from 'react';

import { ErrorMessage, GoBackButton, Spinner } from '@/shared/components';

type PropTypes = {
  children: ReactNode;
  isError?: boolean;
  isLoading?: boolean;
};

export const RootWrapper = ({ children, isLoading, isError = false }: PropTypes) => {
  const [hasError, setHasError] = useState(isError);

  useEffect(() => {
    setHasError(isError);
  }, [isError]);

  if (hasError) {
    return (
      <div className="flex flex-col w-full h-full ">
        <div className="relative flex-grow p-2 px-5 flex flex-col items-center justify-between gap-3 h-full w-full">
          <ErrorMessage />
          <div className="flex items-center justify-center h-20 w-full">
            <GoBackButton handleClick={() => setHasError(false)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="relative  flex-grow min-h-0 flex flex-col gap-3 bg-white">
        {isLoading ? <Spinner /> : children}
      </div>
    </div>
  );
};
