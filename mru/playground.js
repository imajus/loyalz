import { Playground } from '@stackr/sdk/plugins';
import { ZeroAddress, Wallet } from 'ethers';
import { rollup } from './src/rollup.js';
import { machine } from './src/machine.js';
import { executeAction } from './src/util.js';

const managerWallet = Wallet.createRandom();
const customerWallet = Wallet.createRandom();
const retailerWallet = Wallet.createRandom();

const main = async () => {
  // Init Micro-rollup
  await rollup.init();
  // Connect to playground
  Playground.init(rollup);
  // 1. Create campaign
  await executeAction(
    'createCampaign',
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
  // Get campaign ID
  const campaign = machine.state.campaigns.length - 1;
  console.log(machine.state.campaigns);
  // 2. Add receipt
  await executeAction(
    'addReceipt',
    {
      id: '010101010101010101',
      sku: '12345678',
      quantity: 3,
    },
    customerWallet,
    customerWallet.address,
  );
  // 3. Whitelist retailer
  await executeAction(
    'whitelistRetailer',
    {
      campaign,
      address: retailerWallet.address,
    },
    managerWallet,
    managerWallet.address,
  );
  // 4. Claim reward
  await executeAction(
    'claimReward',
    {
      campaign,
      customer: customerWallet.address,
    },
    retailerWallet,
    retailerWallet.address,
  );
};

main();
