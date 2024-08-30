import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/shared/components';
import { useAuth } from '@/shared/hook/useAuth/useAuth';
import {
  getAccounts,
  getBalance,
  getUserInfo,
  sendRollupMessage,
  sendTransaction,
  signMessage,
  signRollupMessage,
} from '@/shared/utils/web3Auth';
import { IProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

type PropTypes = {
  web3auth: Web3Auth;
  provider: IProvider | null;
  setProvider: Dispatch<SetStateAction<IProvider | null>>;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const RPCButtons = ({ web3auth, provider, setProvider, setLoggedIn }: PropTypes) => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={() => getUserInfo(web3auth)}>Get User Info</Button>
      <Button onClick={() => getAccounts(provider)}>Get Accounts</Button>
      <Button onClick={() => getBalance(provider)}>Get Balance</Button>
      <Button onClick={() => signMessage(provider)}>Sign Message</Button>
      <Button onClick={() => sendTransaction(provider)}>Send Transaction</Button>
      <hr />
      <Button onClick={() => signRollupMessage(provider)}>Sign Rollup Message</Button>
      <Button onClick={() => sendRollupMessage(provider)}>Send Rollup Message</Button>
      <Button onClick={() => logout(web3auth, setProvider, setLoggedIn)}>Log Out</Button>
    </div>
  );
};
