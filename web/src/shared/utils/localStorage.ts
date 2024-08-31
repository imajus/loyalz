import { Web3User } from '@/shared/types';

const USER_DATA = 'user';

export const storeUserInfo = (userInfo: Web3User | null) => {
  if (!window) return false;
  if (!userInfo) {
    window.localStorage.removeItem(USER_DATA);
    return true;
  }

  window.localStorage.setItem(USER_DATA, JSON.stringify(userInfo));
  return true;
};

export const getLocalUserInfo = () => {
  if (!window) return null;

  const json = window.localStorage.getItem(USER_DATA);
  const userData: Web3User | null = json ? JSON.parse(json) : null;

  return userData;
};
