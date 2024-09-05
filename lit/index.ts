import { conditionalSigning } from './src/api.js';

const privateKey = process.env["ETHEREUM_PRIVATE_KEY"];
await conditionalSigning(privateKey);