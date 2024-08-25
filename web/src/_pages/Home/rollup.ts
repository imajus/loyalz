import { JsonRpcSigner, Signer } from 'ethers';
import { once } from 'lodash';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const fetchRollupInfo = once(async () => {
  const res = await fetch(`${BASE_URL}/info`);
  if (!res.ok) {
    throw new Error('Failed to fetch rollup info');
  }
  return res.json();
});

export const signActionInputs = async (name: string, inputs: object, signer: Signer) => {
  const { domain, transitionToSchema, schemas } = await fetchRollupInfo();
  const schemaName = transitionToSchema[name];
  const schema = schemas[schemaName];
  return signer.signTypedData(domain, schema.types, inputs);
};

export const submitRollupAction = async (name: string, inputs: object, signer: JsonRpcSigner) => {
  const signature = await signActionInputs(name, inputs, signer);
  const res = await fetch(`${BASE_URL}/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      msgSender: signer.address,
      signature,
      inputs,
    }),
  });
  const json = await res.json();
  if ((json as any).error) {
    throw new Error((json as any).error);
  }
  return json;
};
