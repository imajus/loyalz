import RPC from '@/_pages/web-auth/ethersRPC';
import { IProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

export const getUserInfo = async (web3auth: Web3Auth) => {
  const user = await web3auth.getUserInfo();
  console.log({ user });
  return user;
};

// Check the RPC file for the implementation
export const getAccounts = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const address = await RPC.getAccounts(provider);
  console.log({ address });
};

export const getBalance = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const balance = await RPC.getBalance(provider);
  console.log({ balance });
};

export const signMessage = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const signedMessage = await RPC.signMessage(provider);
  console.log({ signedMessage });
};

export const sendTransaction = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const transactionReceipt = await RPC.sendTransaction(provider);
  console.log({ transactionReceipt });
};

export const signRollupMessage = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const signedMessage = await RPC.signRollupMessage(provider);
  console.log({ signedMessage });
};

export const sendRollupMessage = async (provider: IProvider | null) => {
  if (!provider) {
    return;
  }
  const signedMessage = await RPC.sendRollupMessage(provider);
  console.log({ signedMessage });
};
