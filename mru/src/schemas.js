import { ActionSchema, SolidityType } from '@stackr/sdk';

// define and export the schema for your action

export const createCampaignSchema = new ActionSchema('create-campaign', {
  manager: SolidityType.ADDRESS, //TODO: Excessive?
  name: SolidityType.STRING,
  token: SolidityType.ADDRESS,
  grants: [
    {
      sku: SolidityType.STRING,
      amount: SolidityType.UINT,
    },
  ],
  burner: {
    reward: SolidityType.STRING,
    //FIXME: [Solidity.ADDRESS] is not supported
    retailer: SolidityType.ADDRESS,
    requirements: [
      {
        token: SolidityType.ADDRESS,
        amount: SolidityType.UINT,
      },
    ],
  },
  active: SolidityType.BOOL,
  //TODO: Other fields...
});

export const whitelistRetailers = new ActionSchema('whitelist-retailers', {
  campaign: SolidityType.UINT,
  retailers: SolidityType.ADDRESS,
});

export const addReceiptSchema = new ActionSchema('add-receipt', {
  customer: SolidityType.ADDRESS, //TODO: Excessive?
  sku: SolidityType.STRING,
  quantity: SolidityType.UINT,
  //TODO: Other fields...
});

export const claimRewardSchema = new ActionSchema('claim-reward', {
  campaign: SolidityType.UINT,
  customer: SolidityType.ADDRESS,
  //TODO: Other fields...
});
