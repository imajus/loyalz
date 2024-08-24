import { State, StateMachine } from '@stackr/sdk/machine';
import { ZeroHash, solidityPackedKeccak256 } from 'ethers';
import genesis from '../genesis-state.json' assert { type: 'json' };
import { transitions } from './transitions.js';

/**
 * @typedef CampaignStateSchema
 * @property {string} manager
 * @property {string} name
 * @property {string} sku
 * @property {string} token
 * @property {number} amount
 * @property {object} reward
 * @property {object} reward.kind
 * @property {string} reward.token
 * @property {number} reward.amount
 * @property {string[]} reward.retailers
 * @property {boolean} active
 */

/**
 * @typedef ReceiptStateSchema
 * @property {string} customer
 * @property {string} sku
 * @property {number} quantity
 */

/**
 * @typedef LoyalzStateSchema
 * @property {CampaignStateSchema[]} campaigns
 * @property {ReceiptStateSchema[]} receipts
 */

/**
 * @extends {State<LoyalzStateSchema>}
 */
export class LoyalzState extends State {
  getRootHash() {
    const { campaigns, receipts } = this.state;
    const tokens = this.state.campaigns.map(({ token }) => token);
    if (tokens.length === 0) {
      return ZeroHash;
    }
    //TODO: Proper implementation
    return solidityPackedKeccak256(['address[]'], [tokens]);
  }
}

// Define and export the State Machine
// this will require State class, Transitions, and genesis state

export const machine = new StateMachine({
  id: 'loyalz',
  stateClass: LoyalzState,
  initialState: genesis.state,
  on: transitions,
});
