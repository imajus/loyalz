import { without } from 'lodash';
import { REQUIRE } from '@stackr/sdk/machine';
import { LoyalzStateWrapper } from './machine.js';

/**
 * @template T
 * @typedef LoyalzStateSTF
 * @type {import('@stackr/sdk/machine').STF<LoyalzStateWrapper, T>}
 */

/**
 * @type {LoyalzStateSTF<CreateCampaignInputs>}
 */
const createCampaign = {
  handler: ({ inputs, state, msgSender }) => {
    state.campaigns.push({
      ...inputs,
      manager: msgSender,
      retailers: [],
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
    campaign.retailers.push(inputs.address);
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
      campaign.retailers.includes(inputs.address),
      'Retailer is not whitelisted',
    );
    campaign.retailers = without(campaign.retailers, inputs.address);
    return state;
  },
};

/**
 * @type {LoyalzStateSTF<AddReceiptInputs>}
 */
const addReceipt = {
  handler: ({ inputs, state, msgSender }) => {
    //TODO: Prevent duplicates
    const campaign = state.campaigns.find(({ sku }) => sku === inputs.sku);
    if (campaign) {
      state.mints.push({
        customer: msgSender,
        token: campaign.mintToken,
        amount: campaign.mintAmount * inputs.quantity,
      });
    }
    state.receipts.push({
      id: inputs.id,
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
    const campaign = state.campaigns[inputs.campaign];
    const isManager = msgSender === campaign.manager;
    const isRetailer = campaign.retailers.includes(msgSender);
    // const hasToken = campaign.reward.token === '???';
    // const hasAmount = campaign.reward.amount === '???';
    REQUIRE(isManager || isRetailer, 'Access denied to claiming');
    // REQUIRE(hasToken && hasAmount, 'Does not meet token requirements');
    state.burns.push(
      {
        customer: inputs.customer,
        token: campaign.mintToken,
        amount: campaign.mintAmount,
      },
      {
        customer: inputs.customer,
        token: campaign.otherToken,
        amount: campaign.otherAmount,
      },
    );
    return state;
  },
};

/**
 * @type {import('@stackr/sdk/machine').Transitions<LoyalzStateWrapper>}
 */
export const transitions = {
  createCampaign,
  addReceipt,
  whitelistRetailer,
  delistRetailer,
  claimReward,
};
