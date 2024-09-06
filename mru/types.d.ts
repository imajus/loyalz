// State schemas

interface CampaignState {
  manager: string;
  name: string;
  sku: string;
  mintToken: string;
  mintAmount: number;
  reward?: string;
  otherToken?: string;
  otherAmount?: number;
  retailers: string[];
}

interface ReceiptState {
  id: string;
  customer: string;
  sku: string;
  quantity: number;
  mints: number[];
}

interface TokenEvent {
  campaign: number;
  customer: string;
  token: string;
  amount: number;
  timestamp: number;
}

interface LoyalzState {
  campaigns: CampaignState[];
  receipts: ReceiptState[];
  mints: TokenEvent[];
  burns: TokenEvent[];
}

// Action schemas

type CreateCampaignInputs = {
  name: string;
  sku: string;
  mintToken: string;
  mintAmount: number;
  reward?: string;
  otherToken?: string;
  otherAmount?: number;
} & import('@stackr/sdk').AllowedInputTypes;

type AlterRetailerInputs = {
  campaign: number;
  address: string;
} & import('@stackr/sdk').AllowedInputTypes;

type AddReceiptInputs = {
  id: string;
  sku: string;
  quantity: number;
} & import('@stackr/sdk').AllowedInputTypes;

type ClaimRewardInputs = {
  campaign: number;
  customer: string;
} & import('@stackr/sdk').AllowedInputTypes;
