import { MicroRollup } from '@stackr/sdk';
import { stackrConfig } from './stackr.config.js';
import { machine } from './src/machine.js';
import {
  createCampaignSchema,
  whitelistRetailers,
  addReceiptSchema,
  claimRewardSchema,
} from './src/schemas.js';

export {
  createCampaignSchema,
  whitelistRetailers,
  addReceiptSchema,
  claimRewardSchema,
};

export const rollup = await MicroRollup({
  config: stackrConfig,
  actionSchemas: [
    createCampaignSchema,
    whitelistRetailers,
    addReceiptSchema,
    claimRewardSchema,
  ],
  stateMachines: [machine],
});
