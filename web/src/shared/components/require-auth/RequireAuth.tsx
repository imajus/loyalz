'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useWeb3Auth } from '@/shared/hook';
import { removeLeadingTrailingSlashes } from '@/shared/utils';
import { toastError } from '@/shared/utils/toast';

import { Spinner } from '../spinner/Spinner';

type PropTypes = {
  children: ReactNode;
};
export const RequireAuth = ({ children }: PropTypes) => {
  const { isLoggedIn, isLoading } = useWeb3Auth();
  const router = useRouter();
  const pathname = usePathname();
  const pageSlug = removeLeadingTrailingSlashes(pathname);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isLoggedIn) {
      router.push(`/web3auth?redirectUrl=${pageSlug}`, { scroll: false });
      toastError('Authorization requred');
    }
  }, [router, isLoggedIn, isLoading]);

  if (isLoading) return <Spinner />;

  if (isLoggedIn) {
    return children;
  }

  return null;
};
