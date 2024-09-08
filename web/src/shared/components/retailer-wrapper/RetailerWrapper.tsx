'use client';
import { ReactNode, useEffect, useState } from 'react';

import { ErrorMessage, GoBackButton, Spinner } from '@/shared/components';

import { Wrapper } from './ui/Wrapper';

type PropTypes = {
  title: string;
  children: ReactNode;
  DoneMessage?: ReactNode;
  isDone?: boolean;
  isError?: boolean;
  isLoading?: boolean;
};

export const RetailerWrapper = ({
  title,
  children,
  DoneMessage = null,
  isLoading,
  isDone = false,
  isError = false,
}: PropTypes) => {
  const [hasError, setHasError] = useState(isError);

  useEffect(() => {
    setHasError(isError);
  }, [isError]);

  if (hasError) {
    return (
      <Wrapper title={title}>
        <div className="relative flex-grow p-2 px-5 flex flex-col items-center justify-between gap-3 h-full w-full">
          <ErrorMessage />
          <div className="flex items-center justify-center h-20 w-full">
            <GoBackButton handleClick={() => setHasError(false)} />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (isDone) {
    return (
      <Wrapper title={title}>
        <div className="relative  flex-grow min-h-0 p-2 px-5 flex flex-col gap-3">
          {DoneMessage}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper title={title}>
      <div className="relative  flex-grow min-h-0 p-2 px-5 flex flex-col gap-3">
        {isLoading ? <Spinner /> : children}
      </div>
    </Wrapper>
  );
};
