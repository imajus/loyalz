import { DA, KeyPurpose, SignatureScheme, StackrConfig } from '@stackr/sdk';
import dotenv from 'dotenv';

dotenv.config();

const stackrConfig: StackrConfig = {
  isSandbox: Boolean(process.env.IS_SANDBOX),
  sequencer: {
    blockSize: 16,
    blockTime: 10,
  },
  syncer: {
    vulcanRPC: process.env.VULCAN_RPC as string,
    L1RPC: process.env.L1_RPC as string,
  },
  operator: {
    accounts: [
      {
        privateKey: process.env.PRIVATE_KEY as string,
        purpose: KeyPurpose.BATCH,
        scheme: SignatureScheme.ECDSA,
      },
    ],
  },
  domain: {
    name: 'Loyalz',
    version: '0.0.1',
    salt: '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  },
  datastore: {
    type: 'sqlite',
    uri: process.env.DATABASE_URI as string,
  },
  preferredDA: DA.AVAIL,
  registryContract: process.env.REGISTRY_CONTRACT as string,
  logLevel: 'log',
};

export { stackrConfig };
