import { DA, KeyPurpose, SignatureScheme, StackrConfig } from "@stackr/sdk";
import dotenv from "dotenv";

dotenv.config();

/**
 * @type {StackrConfig}
 */
const stackrConfig = {
  isSandbox: true,
  sequencer: {
    blockSize: 16,
    blockTime: 10,
  },
  syncer: {
    vulcanRPC: process.env.VULCAN_RPC,
    L1RPC: process.env.L1_RPC,
  },
  operator: {
    accounts: [
      {
        privateKey: process.env.PRIVATE_KEY,
        purpose: KeyPurpose.BATCH,
        scheme: SignatureScheme.ECDSA,
      },
    ],
  },
  domain: {
    name: "Loyalz",
    version: "0.0.1",
    salt: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  },
  datastore: {
    type: "sqlite",
    uri: process.env.DATABASE_URI,
  },
  preferredDA: DA.AVAIL,
  registryContract: process.env.REGISTRY_CONTRACT,
  logLevel: "log",
};

export { stackrConfig };
