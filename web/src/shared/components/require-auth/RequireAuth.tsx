'use client';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

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

  if (isAuthenticated) {
    return children;
  }

  toastError('Authorization requred');

  router.push('web3auth', { scroll: false });
};
