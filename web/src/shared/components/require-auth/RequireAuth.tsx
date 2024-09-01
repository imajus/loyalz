'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useWeb3Auth } from '@/shared/hook';
import { toastError } from '@/shared/utils/toast';

import { Spinner } from '../spinner/Spinner';

type PropTypes = {
  children: ReactNode;
};
export const RequireAuth = ({ children }: PropTypes) => {
  const { isLoggedIn, isLoading, setIsLoading } = useWeb3Auth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        if (isLoading) {
          //if web3auth taking more than a minute, stop loading spinner and display login page again

          toastError('Something went wrong');
          setIsLoading?.(false);
        }
      }, 10000);
      return;
    }

    if (!isLoggedIn) {
      router.push('/web3auth', { scroll: false });
      toastError('Authorization requred');
    }
  }, [router, isLoggedIn, isLoading]);

  if (isLoading) return <Spinner />;

  if (isLoggedIn) {
    return children;
  }

  return null;
};
