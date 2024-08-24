import { Playground } from '@stackr/sdk/plugins';
import { ZeroAddress, Wallet } from 'ethers';
import { createCampaignSchema, rollup } from './index.js';

const wallet = Wallet.createRandom();

/**
 *
 * @param {import('ethers').HDNodeWallet} wallet
 * @param {import('@stackr/sdk').ActionSchema} schema
 * @param {import('@stackr/sdk').AllowedInputTypes} payload
 * @returns
 */
const signMessage = async (wallet, schema, payload) => {
  const signature = await wallet.signTypedData(
    schema.domain,
    schema.EIP712TypedData.types,
    payload,
  );
  return signature;
};

const main = async () => {
  // Init Micro-rollup
  await rollup.init();
  // Connect to playground
  Playground.init(rollup);
  // Action inputs
  const inputs = {
    name: `Campaign #${Date.now()}`,
    sku: '12345678',
    token: ZeroAddress,
    amount: 1,
    rewardKind: 'xxx',
    rewardForToken: ZeroAddress,
    rewardForAmount: 1,
  };
  // Sign transaction
  const signature = await signMessage(wallet, createCampaignSchema, inputs);
  // Prepare transaction
  const action = createCampaignSchema.actionFrom({
    inputs,
    signature,
    msgSender: wallet.address,
  });
  // Send transaction
  const ack = await rollup.submitAction(
    createCampaignSchema.identifier,
    action,
  );
  console.log(ack);
};

main();
