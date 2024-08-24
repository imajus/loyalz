import { rollup } from './rollup.js';
import {
  createCampaignSchema,
  whitelistRetailerSchema,
  delistRetailerSchema,
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

function makeAction(schema) {
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
    return rollup.submitAction(schema.identifier, action);
  };
}

/**
 * @type {(inputs: CreateCampaignInputs, signer: import('ethers').Signer, address: string) => Promise<import('@stackr/sdk').SerializedAcknowledgement>}
 */
export const createCampaign = makeAction(createCampaignSchema);

/**
 * @type {(inputs: AlterRetailerInputs, signer: import('ethers').Signer, address: string) => Promise<import('@stackr/sdk').SerializedAcknowledgement>}
 */
export const whitelistRetailer = makeAction(whitelistRetailerSchema);

/**
 * @type {(inputs: AlterRetailerInputs, signer: import('ethers').Signer, address: string) => Promise<import('@stackr/sdk').SerializedAcknowledgement>}
 */
export const delistRetailer = makeAction(delistRetailerSchema);

/**
 * @type {(inputs: AddReceiptInputs, signer: import('ethers').Signer, address: string) => Promise<import('@stackr/sdk').SerializedAcknowledgement>}
 */
export const addReceipt = makeAction(addReceiptSchema);

/**
 * @type {(inputs: ClaimRewardInputs, signer: import('ethers').Signer, address: string) => Promise<import('@stackr/sdk').SerializedAcknowledgement>}
 */
export const claimReward = makeAction(claimRewardSchema);
