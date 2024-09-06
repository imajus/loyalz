import { map, unzip } from 'lodash';
import { State, StateMachine } from '@stackr/sdk/machine';
import { ZeroHash, solidityPackedKeccak256 } from 'ethers';
import genesis from '../genesis-state.json' assert { type: 'json' };
import { transitions } from './transitions.js';

/**
 * @extends {State<LoyalzState>}
 */
export class LoyalzStateWrapper extends State {
  getRootHash() {
    const { mints, burns } = this.state;
    // if (mints.length + burns.length === 0) {
    //   return ZeroHash;
    // }
    //TODO: Proper implementation
    const [types, values] = unzip([
      ['address[]', map(mints, 'customer')],
      ['string[]', map(mints, 'token')],
      ['uint[]', map(mints, 'amount').map(String)],
      ['address[]', map(burns, 'customer')],
      ['string[]', map(burns, 'token')],
      ['uint[]', map(burns, 'amount').map(String)],
    ]);
    return solidityPackedKeccak256(types, values);
  }
}

// Define and export the State Machine
// this will require State class, Transitions, and genesis state

export const machine = new StateMachine({
  id: 'loyalz',
  stateClass: LoyalzStateWrapper,
  initialState: genesis.state,
  on: transitions,
});
