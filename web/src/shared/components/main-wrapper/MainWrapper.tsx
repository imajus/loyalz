'use client';
import { ReactNode, useEffect, useState } from 'react';

import { Spinner } from '@/shared/components';

type PropTypes = {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  submitButton?: ReactNode;
};
export const MainWrapper = ({
  title,
  children,
  isLoading: isLoadingOriginal,
  submitButton,
}: PropTypes) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoadingOriginal !== undefined) return;
    setIsLoading(false);
  }, [isLoadingOriginal]);

  useEffect(() => {
    if (isLoadingOriginal === undefined) return;
    setIsLoading(isLoadingOriginal);
  }, [isLoadingOriginal]);

  return (
    <div className="flex flex-col w-full h-full">
      <h3 className="h-16 flex items-start pt-6 px-3 justify-center text-black text-2xl font-semibold text-center">
        {title}
      </h3>
      <div className="flex-grow min-h-0 p-2 px-5 flex flex-col gap-7">
        {isLoading ? <Spinner /> : children}
      </div>
      {submitButton ? (
        <div className="w-full h-[90px] flex items-center justify-center shrink-0">
          {submitButton}
        </div>
      ) : null}
    </div>
  );
};
