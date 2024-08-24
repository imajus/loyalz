import { MicroRollup } from '@stackr/sdk';
import { stackrConfig } from './stackr.config.js';
import { machine } from './src/machine.js';
import {
  createCampaignSchema,
  whitelistRetailerSchema,
  delistRetailerSchema,
  addReceiptSchema,
  claimRewardSchema,
} from './src/schemas.js';

export {
  createCampaignSchema,
  whitelistRetailerSchema,
  delistRetailerSchema,
  addReceiptSchema,
  claimRewardSchema,
};

export const rollup = await MicroRollup({
  config: stackrConfig,
  actionSchemas: [
    createCampaignSchema,
    whitelistRetailerSchema,
    delistRetailerSchema,
    addReceiptSchema,
    claimRewardSchema,
  ],
  stateMachines: [machine],
});
