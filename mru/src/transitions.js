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
    const regex = /\d+\:0x[\d\w]{40,64}/i;
    REQUIRE(regex.test(inputs.mintToken), 'Token address value is wrong');
    if (inputs.otherToken) {
      REQUIRE(regex.test(inputs.otherToken), 'Token address value is wrong');
    }
    if (inputs.reward) {
      REQUIRE(!!inputs.otherToken, 'Collab token address is missing');
      REQUIRE(!!inputs.otherAmount, 'Collab token address is missing');
    }
    state.campaigns.push({
      manager: msgSender,
      name: inputs.name,
      sku: inputs.sku,
      mintToken: inputs.mintToken,
      mintAmount: Number(inputs.mintAmount),
      ...(inputs.reward && {
        reward: inputs.reward,
        otherToken: inputs.otherToken,
        otherAmount: Number(inputs.otherAmount),
      }),
      retailers: [],
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
    // Prevent reusing receipts with same IDs
    const existing = state.receipts.find((receipt) => receipt.id === inputs.id);
    REQUIRE(!existing, 'Receipt already added');
    const mints = state.campaigns
      .map((campaign, id) => {
        if (campaign.sku === inputs.sku) {
          const length = state.mints.push({
            campaign: id,
            customer: msgSender,
            token: campaign.mintToken,
            amount: campaign.mintAmount * Number(inputs.quantity),
            timestamp: Date.now(),
          });
          return length - 1;
        }
        return null;
      })
      .filter(Boolean);
    state.receipts.push({
      customer: msgSender,
      id: inputs.id,
      sku: inputs.sku,
      quantity: Number(inputs.quantity),
      mints,
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
    const isRetailer = true; //campaign.retailers.includes(msgSender);
    // const hasToken = campaign.reward.token === '???';
    // const hasAmount = campaign.reward.amount === '???';
    REQUIRE(isManager || isRetailer, 'Access denied to claiming');
    // REQUIRE(hasToken && hasAmount, 'Does not meet token requirements');
    state.burns.push(
      {
        campaign: inputs.campaign,
        customer: inputs.customer,
        token: campaign.mintToken,
        amount: Number(campaign.mintAmount),
        timestamp: Date.now(),
      },
      {
        campaign: inputs.campaign,
        customer: inputs.customer,
        token: campaign.otherToken,
        amount: Number(campaign.otherAmount),
        timestamp: Date.now(),
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
