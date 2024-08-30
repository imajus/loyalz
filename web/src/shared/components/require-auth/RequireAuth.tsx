'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useAppSelector } from '@/shared/store/hook';
import { userSelector } from '@/shared/store/selector/user';
import { toastError } from '@/shared/utils/toast';

type PropTypes = {
  children: ReactNode;
};
export const RequireAuth = ({ children }: PropTypes) => {
  const currentUser = useAppSelector(userSelector);
  const isAuthenticated = !!(currentUser.idToken || currentUser.oAuthAccessToken);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/web3auth', { scroll: false });
      toastError('Authorization requred');
    }
  }, [router, isAuthenticated]);

  if (isAuthenticated) {
    return children;
  }

  return null;
};
