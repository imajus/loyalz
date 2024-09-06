export type CreateCampaignErrors = {
  name: string;
  sku: string;
  mintToken: string;
  mintAmount: string;
  reward?: string;
  otherToken?: string;
  otherAmount?: string;
};
