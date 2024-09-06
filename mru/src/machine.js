import { State, StateMachine } from '@stackr/sdk/machine';
import genesis from '../genesis-state.json' assert { type: 'json' };
import { transitions } from './transitions.js';
import { constructTree } from './tree.js';

/**
 * @extends {State<LoyalzState>}
 */
export class LoyalzStateWrapper extends State {
  getRootHash() {
    const tree = constructTree(this.state);
    return tree.getHexRoot();
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
