import { Client, XmtpEnv } from '@xmtp/xmtp-js';
import { Wallet, getDefaultProvider } from 'ethers';
import { broadcastConfigs } from './broadcast.config';

export const getXmtpClient = async (address: string) => {
  const { /*id,*/ name } = broadcastConfigs.find(({ address: a }) => a === address) || {};
  // const privateToken = process.env[`NEXT_PUBLIC_${id}_BROADCAST_PRIVATE_KEY`] || '';
  const privateToken = process.env.NEXT_PUBLIC_LB_BROADCAST_PRIVATE_KEY || '';

  const provider = getDefaultProvider('sepolia');
  // @ts-ignore
  const signer = new Wallet(privateToken, provider);
  try {
    const client = await Client.create(signer, {
      env: (process.env.XMTP_ENV as XmtpEnv) ?? 'dev',
    });
    console.log(`Client initialized at: ${client.address} for ${name}`);
    return client;
  } catch (err) {
    console.log(err);
  }
};
