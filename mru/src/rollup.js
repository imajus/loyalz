import { MicroRollup } from '@stackr/sdk';
import { stackrConfig } from '../stackr.config.ts';
import { machine } from './machine.js';
import {
  createCampaignSchema,
  alterRetailerSchema,
  addReceiptSchema,
  claimRewardSchema,
} from './schemas.js';

export const rollup = await MicroRollup({
  config: stackrConfig,
  actionSchemas: [
    createCampaignSchema,
    alterRetailerSchema,
    addReceiptSchema,
    claimRewardSchema,
  ],
  stateMachines: [machine],
  stfSchemaMap: {
    'createCampaign': createCampaignSchema,
    'whitelistRetailer': alterRetailerSchema,
    'delistRetailer': alterRetailerSchema,
    'addReceipt': addReceiptSchema,
    'claimReward': claimRewardSchema,
  },
});
