import { without } from 'lodash';
import { REQUIRE } from '@stackr/sdk/machine';
import { LoyalzState } from './machine.js';

/**
 * @template T
 * @typedef LoyalzStateSTF
 * @type {import('@stackr/sdk/machine').STF<LoyalzState, T>}
 */

/**
 * @type {LoyalzStateSTF<CreateCampaignInputs>}
 */
const createCampaign = {
  handler: ({ inputs, state, msgSender }) => {
    state.campaigns.push({
      manager: msgSender,
      name: inputs.name,
      sku: inputs.sku,
      token: inputs.token,
      amount: inputs.amount,
      reward: {
        kind: inputs.rewardKind,
        token: inputs.rewardForToken,
        amount: inputs.rewardForAmount,
        retailers: [],
      },
      active: true,
    });
    return state;
  },
};

/**
 * @type {LoyalzStateSTF<AlterRetailerInputs>}
 */
const whitelistRetailer = {
  handler: ({ inputs, state, msgSender }) => {
    const campaign = state.campaigns[inputs.campaign];
    REQUIRE(campaign.manager === msgSender, 'Access denied to campaign');
    campaign.reward.retailers.push(inputs.address);
    return state;
  },
};

/**
 * @type {LoyalzStateSTF<AlterRetailerInputs>}
 */
const delistRetailer = {
  handler: ({ inputs, state, msgSender }) => {
    const campaign = state.campaigns[inputs.campaign];
    REQUIRE(campaign.manager === msgSender, 'Access denied to campaign');
    REQUIRE(
      campaign.reward.retailers.includes(inputs.address),
      'Retailer is not whitelisted',
    );
    campaign.reward.retailers = without(
      campaign.reward.retailers,
      inputs.address,
    );
    return state;
  },
};

/**
 * @type {LoyalzStateSTF<AddReceiptInputs>}
 */
const addReceipt = {
  handler: ({ inputs, state, msgSender }) => {
    //TODO: Prevent duplicates
    state.receipts.push({
      customer: msgSender,
      sku: inputs.sku,
      quantity: inputs.quantity,
    });
    return state;
  },
};

/**
 * @type {LoyalzStateSTF<ClaimRewardInputs>}
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
  whitelistRetailer,
  delistRetailer,
  claimReward,
};
