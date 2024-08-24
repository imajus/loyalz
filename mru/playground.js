import { Playground } from '@stackr/sdk/plugins';
import { Wallet } from 'ethers';
import { rollup } from './index.js';

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
    payload
  );
  return signature;
};

const main = async () => {
  // Init Micro-rollup
  await rollup.init();
  // Connect to playground
  Playground.init(rollup);
  // Action inputs
  const inputs = {};
  // Sign transaction
  // const signature = await signMessage(wallet, SampleSchema, inputs);
  // Prepare transaction
  // const incrementAction = SampleSchema.actionFrom({
  //   inputs,
  //   signature,
  //   msgSender: wallet.address,
  // });
  // Send transaction
  // const ack = await rollup.submitAction('sample', incrementAction);
  // console.log(ack);
};

main();
