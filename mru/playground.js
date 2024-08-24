import { Playground } from '@stackr/sdk/plugins';
import { ZeroAddress, Wallet } from 'ethers';
import { rollup } from './src/rollup.js';
import {
  addReceipt,
  claimReward,
  createCampaign,
  whitelistRetailer,
} from './src/api.js';

const managerWallet = Wallet.createRandom();
const customerWallet = Wallet.createRandom();
const retailerWallet = Wallet.createRandom();

const main = async () => {
  // Init Micro-rollup
  await rollup.init();
  // Connect to playground
  Playground.init(rollup);
  // 1. Create campaign
  await createCampaign(
    {
      name: 'Campaign #1',
      sku: '12345678',
      mintToken: ZeroAddress,
      mintAmount: 1,
      reward: 'xxx',
      otherToken: ZeroAddress,
      otherAmount: 1,
    },
    managerWallet,
    managerWallet.address,
  );
  // 2. Add receipt
  await addReceipt(
    {
      id: '010101010101010101',
      sku: '12345678',
      quantity: 3,
    },
    customerWallet,
    customerWallet.address,
  );
  // 3. Whitelist retailer
  await whitelistRetailer(
    {
      campaign: 0,
      address: retailerWallet.address,
    },
    managerWallet,
    managerWallet.address,
  );
  // 4. Claim reward
  await claimReward(
    {
      campaign: 0,
      customer: customerWallet.address,
    },
    retailerWallet,
    retailerWallet.address,
  );
};

main();
