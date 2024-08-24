import { MicroRollup } from '@stackr/sdk';
import { stackrConfig } from '../stackr.config.js';
import { machine } from './src/machine.js';

// export {} from './src/schemas.ts';

export const rollup = await MicroRollup({
  config: stackrConfig,
  actionSchemas: [],
  stateMachines: [machine],
});
