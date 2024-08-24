import { ActionSchema, SolidityType } from '@stackr/sdk';

// define and export the schema for your action

export const createCampaignSchema = new ActionSchema('createCampaign', {
  name: SolidityType.STRING,
  sku: SolidityType.STRING,
  token: SolidityType.ADDRESS,
  amount: SolidityType.UINT,
  rewardKind: SolidityType.STRING,
  rewardForToken: SolidityType.ADDRESS,
  rewardForAmount: SolidityType.UINT,
  //TODO: Other fields...
});

export const whitelistRetailerSchema = new ActionSchema('whitelistRetailer', {
  campaign: SolidityType.UINT,
  address: SolidityType.ADDRESS,
});

export const delistRetailerSchema = new ActionSchema('delistRetailer', {
  campaign: SolidityType.UINT,
  address: SolidityType.ADDRESS,
});

export const addReceiptSchema = new ActionSchema('addReceipt', {
  sku: SolidityType.STRING,
  quantity: SolidityType.UINT,
  //TODO: Other fields...
});

export const claimRewardSchema = new ActionSchema('claimReward', {
  campaign: SolidityType.UINT,
  customer: SolidityType.ADDRESS,
  //TODO: Other fields...
});
