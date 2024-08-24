import { State, StateMachine } from '@stackr/sdk/machine';
import { solidityPackedKeccak256 } from 'ethers';
import genesis from '../genesis-state.json';
import { transitions } from './transitions';

/**
 * @typedef CampaignStateSchema
 * @property {string} manager
 * @property {string} name
 * @property {string} token
 * @property {object[]} grants
 * @property {object} burner
 * @property {string} burner.reward
 * @property {string[]} burner.retailers
 * @property {object[]} burner.requirements
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
    //TODO: Proper implementation
    return solidityPackedKeccak256(
      ['address[]'],
      [this.state.campaigns.map(({ token }) => token)],
    );
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
