import { Playground } from '@stackr/sdk/plugins';
import { ZeroAddress, Wallet } from 'ethers';
import { rollup } from './src/rollup.js';
import { createCampaign } from './src/api.js';

const wallet = Wallet.createRandom();

const main = async () => {
  // Init Micro-rollup
  await rollup.init();
  // Connect to playground
  Playground.init(rollup);
  // Action inputs
  const ack = await createCampaign(
    {
      name: `Campaign #${Date.now()}`,
      sku: '12345678',
      token: ZeroAddress,
      amount: 1,
      rewardKind: 'xxx',
      rewardForToken: ZeroAddress,
      rewardForAmount: 1,
    },
    wallet,
    wallet.address,
  );
  console.log(ack);
};

main();
