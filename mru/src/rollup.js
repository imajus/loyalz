import { MicroRollup } from '@stackr/sdk';
import { stackrConfig } from '../stackr.config.ts';
import { machine } from './machine.js';
import {
  createCampaignSchema,
  whitelistRetailerSchema,
  delistRetailerSchema,
  addReceiptSchema,
  claimRewardSchema,
} from './schemas.js';

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
