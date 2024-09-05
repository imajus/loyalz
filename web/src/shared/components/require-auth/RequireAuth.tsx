'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { removeLeadingTrailingSlashes } from '@/shared/utils';
import { getLocalUserInfo } from '@/shared/utils/localStorage';
import { toastError } from '@/shared/utils/toast';
import { getUserIsAuthenticated } from '@/shared/utils/web3Auth';

import { Spinner } from '../spinner/Spinner';

type PropTypes = {
  children: ReactNode;
};
export const RequireAuth = ({ children }: PropTypes) => {
  const router = useRouter();
  const pathname = usePathname();
  const pageSlug = removeLeadingTrailingSlashes(pathname);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const currentUser = getLocalUserInfo();
    if (!getUserIsAuthenticated(currentUser)) {
      router.push(`/web3auth?redirectUrl=${pageSlug}`, { scroll: false });
      toastError('Authorization requred');
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);
    setIsLoading(false);
  }, [router, pageSlug]);

  if (isLoading) return <Spinner />;

  if (isLoggedIn) {
    return children;
  }

  return null;
};
