// State schemas

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

interface LoyalzState {
  campaigns: CampaignState[];
  receipts: ReceiptState[];
  mints: {
    customer: string;
    token: string;
    amount: number;
  }[];
  burns: {
    customer: string;
    token: string;
    amount: number;
  }[];
}
