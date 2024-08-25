import { ActionSchema, SolidityType } from '@stackr/sdk';

// define and export the schema for your action

export const createCampaignSchema = new ActionSchema('createCampaign', {
  name: SolidityType.STRING,
  sku: SolidityType.STRING,
  mintToken: SolidityType.ADDRESS,
  mintAmount: SolidityType.UINT,
  reward: SolidityType.STRING,
  otherToken: SolidityType.ADDRESS,
  otherAmount: SolidityType.UINT,
  //TODO: Other fields...
});

export const alterRetailerSchema = new ActionSchema('alterRetailer', {
  campaign: SolidityType.UINT,
  address: SolidityType.ADDRESS,
});

export const addReceiptSchema = new ActionSchema('addReceipt', {
  id: SolidityType.STRING,
  sku: SolidityType.STRING,
  quantity: SolidityType.UINT,
  //TODO: Other fields...
});

export const claimRewardSchema = new ActionSchema('claimReward', {
  campaign: SolidityType.UINT,
  customer: SolidityType.ADDRESS,
  //TODO: Other fields...
});
