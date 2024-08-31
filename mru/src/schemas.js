import { ActionSchema, SolidityType } from '@stackr/sdk';

// define and export the schema for your action

export const createCampaignSchema = new ActionSchema('createCampaignSchema', {
  name: SolidityType.STRING,
  sku: SolidityType.STRING,
  mintToken: SolidityType.ADDRESS,
  mintAmount: SolidityType.UINT,
  reward: SolidityType.STRING,
  otherToken: SolidityType.ADDRESS,
  otherAmount: SolidityType.UINT,
  //TODO: Other fields...
});

export const alterRetailerSchema = new ActionSchema('alterRetailerSchema', {
  campaign: SolidityType.UINT,
  address: SolidityType.ADDRESS,
});

export const addReceiptSchema = new ActionSchema('addReceiptSchema', {
  id: SolidityType.STRING,
  sku: SolidityType.STRING,
  quantity: SolidityType.UINT,
  //TODO: Other fields...
});

export const claimRewardSchema = new ActionSchema('claimRewardSchema', {
  campaign: SolidityType.UINT,
  customer: SolidityType.ADDRESS,
  //TODO: Other fields...
});
