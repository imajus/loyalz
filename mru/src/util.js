import { rollup } from './rollup.js';

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

export async function executeAction(name, inputs, signer, sender) {
  // Extract schema
  const schemaName = rollup.getStfSchemaMap()[name];
  const schema = rollup.actions.getSchema(schemaName);
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
}
