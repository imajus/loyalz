import RPC from '@/_pages/web-auth/ethersRPC';
import { Web3User } from '@/shared/types';
import { IProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

export const getUserInfo = async (web3auth: Web3Auth | null) => {
  if (!web3auth || !web3auth.connected) return null;

  const user = await web3auth.getUserInfo();
  return user;
};

// Check the RPC file for the implementation
export const getAccounts = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const address = await RPC.getAccounts(provider);
  console.info({ address });
};

export const getBalance = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const balance = await RPC.getBalance(provider);
  console.info({ balance });
};

export const signMessage = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const signedMessage = await RPC.signMessage(provider);
  console.info({ signedMessage });
};

export const sendTransaction = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const transactionReceipt = await RPC.sendTransaction(provider);
  console.info({ transactionReceipt });
};

export const signRollupMessage = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const signedMessage = await RPC.signRollupMessage(provider);
  console.info({ signedMessage });
};

export const sendRollupMessage = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const signedMessage = await RPC.sendRollupMessage(provider);
  console.info({ signedMessage });
};

export const getUserIsAuthenticated = (currentUser: Web3User | null) => {
  if (!currentUser) return false;
  return !!(currentUser.idToken || currentUser.oAuthAccessToken);
};
