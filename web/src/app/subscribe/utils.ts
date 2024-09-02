import { Wallet, getDefaultProvider } from 'ethers';

export const createConsentMessage = (peerAddress: string, timestamp: number): string => {
  return (
    'XMTP : Grant inbox consent to sender\n' +
    '\n' +
    `Current Time: ${new Date(timestamp).toUTCString()}\n` +
    `From Address: ${peerAddress}\n` +
    '\n' +
    'For more info: https://xmtp.org/signatures/'
  );
};

// Should be replaced by web3Auth or Telegram Lit
const privateToken = process.env.NEXT_PUBLIC_CLIENT_PRIVATE_KEY || '';
const provider = getDefaultProvider('sepolia');
export const wallet = new Wallet(privateToken, provider);
