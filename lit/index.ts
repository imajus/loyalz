import { conditionalSigning } from './src/api.js';

const signatures = await conditionalSigning();
console.log(signatures);