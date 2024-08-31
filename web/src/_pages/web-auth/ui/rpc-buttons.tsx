import { Button } from '@/shared/components';
import { useWeb3Auth } from '@/shared/hook/';
import {
  getAccounts,
  getBalance,
  getUserInfo,
  sendRollupMessage,
  sendTransaction,
  signMessage,
  signRollupMessage,
} from '@/shared/utils/web3Auth';

export const RPCButtons = () => {
  const { web3auth, logoutWeb3Auth, provider } = useWeb3Auth();

  return (
    <div
      className="flex flex-col gap-3 flex-grow overflow-y-scroll"
      style={{ scrollbarWidth: 'none' }}
    >
      <Button onClick={() => getUserInfo(web3auth)}>Get User Info</Button>
      <Button onClick={() => getAccounts(provider)}>Get Accounts</Button>
      <Button onClick={() => getBalance(provider)}>Get Balance</Button>
      <Button onClick={() => signMessage(provider)}>Sign Message</Button>
      <Button onClick={() => sendTransaction(provider)}>Send Transaction</Button>
      <hr />
      <Button onClick={() => signRollupMessage(provider)}>Sign Rollup Message</Button>
      <Button onClick={() => sendRollupMessage(provider)}>Send Rollup Message</Button>
      <Button onClick={() => logoutWeb3Auth?.()}>Log Out</Button>
    </div>
  );
};
