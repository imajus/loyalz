import { REQUIRE } from '@stackr/sdk/machine';
import { LoyalzState } from './machine';

/**
 * @typedef {import('@stackr/sdk/machine').STF<LoyalzState>} LoyalzSTF
 */

/**
 * @type {LoyalzSTF}
 */
const createCampaign = {
  handler: ({ inputs, state, msgSender }) => {
    state.campaigns.push({
      ...inputs.campaign,
      manager: msgSender,
    });
    return state;
  },
};

/**
 * @type {LoyalzSTF}
 */
const addReceipt = {
  handler: ({ inputs, state, msgSender }) => {
    //TODO: Prevent duplicates
    state.receipts.push({
      ...inputs.receipt,
      customer: msgSender,
    });
    return state;
  },
};

/**
 * @type {LoyalzSTF}
 */
const whitelistRetailers = {
  handler: ({ inputs, state, msgSender }) => {
    const campaign = state.campaigns[inputs.campaign];
    REQUIRE(campaign.manager === msgSender, 'Access denied to campaign');
    campaign.burner.retailers = inputs.retailers;
    return state;
  },
};

/**
 * @type {LoyalzSTF}
 */
const claimReward = {
  handler: ({ inputs, state, msgSender }) => {
    //TODO: Implement
    REQUIRE(false, 'Access denied to claiming');
    return state;
  },
};

/**
 * @type {import('@stackr/sdk/machine').Transitions<LoyalzState>}
 */
export const transitions = {
  createCampaign,
  addReceipt,
  whitelistRetailers,
  claimReward,
};
