import { rollup } from './rollup.js';
import {
  createCampaignSchema,
  alterRetailerSchema,
  addReceiptSchema,
  claimRewardSchema,
} from './schemas.js';

/**
 *
 * @param {import('ethers').Signer} signer
 * @param {import('@stackr/sdk').ActionSchema} schema
 * @param {import('@stackr/sdk').AllowedInputTypes} payload
 * @returns
 */
const signMessage = async (signer, schema, payload) => {
  const signature = await signer.signTypedData(
    schema.domain,
    schema.EIP712TypedData.types,
    payload,
  );
  return signature;
};

function makeAction(name, schema) {
  return async function (inputs, signer, sender) {
    // Sign transaction
    const signature = await signMessage(signer, schema, inputs);
    // Prepare transaction
    const action = schema.actionFrom({
      inputs,
      signature,
      msgSender: sender,
    });
    // Send transaction
    return rollup.submitAction(name, action);
  };
}

/**
 * @type {(inputs: CreateCampaignInputs, signer: import('ethers').Signer, address: string) => Promise<import('@stackr/sdk').SerializedAcknowledgement>}
 */
export const createCampaign = makeAction(
  'createCampaign',
  createCampaignSchema,
);

/**
 * @type {(inputs: AlterRetailerInputs, signer: import('ethers').Signer, address: string) => Promise<import('@stackr/sdk').SerializedAcknowledgement>}
 */
export const whitelistRetailer = makeAction(
  'whitelistRetailer',
  alterRetailerSchema,
);

/**
 * @type {(inputs: AlterRetailerInputs, signer: import('ethers').Signer, address: string) => Promise<import('@stackr/sdk').SerializedAcknowledgement>}
 */
export const delistRetailer = makeAction('delistRetailer', alterRetailerSchema);

/**
 * @type {(inputs: AddReceiptInputs, signer: import('ethers').Signer, address: string) => Promise<import('@stackr/sdk').SerializedAcknowledgement>}
 */
export const addReceipt = makeAction('addReceipt', addReceiptSchema);

/**
 * @type {(inputs: ClaimRewardInputs, signer: import('ethers').Signer, address: string) => Promise<import('@stackr/sdk').SerializedAcknowledgement>}
 */
export const claimReward = makeAction('claimReward', claimRewardSchema);
