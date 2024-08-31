import { useContext } from 'react';

import { Web3AuthContext } from '@/shared/context';

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (context === undefined) {
    throw new Error('useWeb3Auth must be used within Web3AuthProvider');
  }

  return context;
};
