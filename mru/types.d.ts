// State schemas

interface CampaignStateSchema {
  manager: string;
  name: string;
  sku: string;
  token: string;
  amount: number;
  reward: {
    kind: string;
    token: string;
    amount: number;
    retailers: string[];
  };
  active: boolean;
}

interface ReceiptStateSchema {
  customer: string;
  sku: string;
  quantity: number;
}

interface LoyalzStateSchema {
  campaigns: CampaignStateSchema[];
  receipts: ReceiptStateSchema[];
}

// Action schemas

type CreateCampaignInputs = {
  name: string;
  sku: string;
  token: string;
  amount: number;
  rewardKind: string;
  rewardForToken: string;
  rewardForAmount: number;
} & import('@stackr/sdk').AllowedInputTypes;

type AlterRetailerInputs = {
  campaign: number;
  address: string;
} & import('@stackr/sdk').AllowedInputTypes;

type AddReceiptInputs = {
  sku: string;
  quantity: number;
} & import('@stackr/sdk').AllowedInputTypes;

type ClaimRewardInputs = {
  campaign: number;
  customer: string;
} & import('@stackr/sdk').AllowedInputTypes;
