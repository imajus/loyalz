import { JsonRpcSigner, Signer } from 'ethers';
import { once } from 'lodash';

interface CampaignState {
  manager: string;
  name: string;
  sku: string;
  mintToken: string;
  mintAmount: number;
  reward: string;
  otherToken?: string;
  otherAmount?: number;
  retailers: string[];
  active: boolean;
}

interface ReceiptState {
  id: string;
  customer: string;
  sku: string;
  quantity: number;
}

interface TokenState {
  customer: string;
  token: string;
  amount: number;
}

type CreateCampaignInputs = {
  name: string;
  sku: string;
  mintToken: string;
  mintAmount: number;
  reward: string;
  otherToken: string;
  otherAmount: number;
};

type AlterRetailerInputs = {
  campaign: number;
  address: string;
};

type AddReceiptInputs = {
  id: string;
  sku: string;
  quantity: number;
};

type ClaimRewardInputs = {
  campaign: number;
  customer: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_MRU_BASE_URL as string;

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
  if ('error' in json) {
    throw new Error(json.error);
  }
  return json;
};

/* Campaigns */

export async function listCampaigns(): Promise<CampaignState[]> {
  const res = await fetch(`${BASE_URL}/campaigns`);
  return res.json();
}

export async function createCampaign(inputs: CreateCampaignInputs, signer: JsonRpcSigner) {
  return submitRollupAction('createCampaign', inputs, signer);
}

export async function whitelistRetailer(inputs: AlterRetailerInputs, signer: JsonRpcSigner) {
  return submitRollupAction('whitelistRetailer', inputs, signer);
}

export async function delistRetailer(inputs: AlterRetailerInputs, signer: JsonRpcSigner) {
  return submitRollupAction('delistRetailer', inputs, signer);
}

/* Receipts */

export async function listReceipts(): Promise<ReceiptState[]> {
  const res = await fetch(`${BASE_URL}/receipts`);
  return res.json();
}

export async function addReceipt(inputs: AddReceiptInputs, signer: JsonRpcSigner) {
  return submitRollupAction('addReceipt', inputs, signer);
}

/* Tokens */

export async function listMints(): Promise<TokenState[]> {
  const res = await fetch(`${BASE_URL}/mints`);
  return res.json();
}

export async function listBurns(): Promise<TokenState[]> {
  const res = await fetch(`${BASE_URL}/burns`);
  return res.json();
}

export async function claimReward(inputs: ClaimRewardInputs, signer: JsonRpcSigner) {
  return submitRollupAction('claimReward', inputs, signer);
}
