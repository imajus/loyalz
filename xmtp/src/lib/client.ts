import { Client, type XmtpEnv } from "@xmtp/xmtp-js";
import { GrpcApiClient } from "@xmtp/grpc-api-client";
import { RedisPersistence } from "@xmtp/redis-persistence";
import { createClient } from "@redis/client";
import { Wallet, getDefaultProvider } from "ethers";
import { broadCastConfigEntities } from "./broadcasterConfigs";

const redis = createClient({
  url: process.env.REDIS_URL,
});
redis.connect();

let clientsInitialized = false;
const clients = new Map<string, Client>();
// Work around for some weirdness when deploying, could be solved by removing grpc though
export async function initializeClients() {
  clientsInitialized = true;
  return Promise.all(
    broadCastConfigEntities.addresses.map(async (address) => {
      console.log("Initializing client for: ", address);
      const config = broadCastConfigEntities.map[address];
      const filePath = process.env[`${config.id}_FILE_PERSISTENCE_PATH`];
      if (!filePath) {
        console.error(`Missing ${config.id}_FILE_PERSISTENCE_PATH`);
        return;
      }
      const privateToken = process.env[`${config.id}_PRIVATE_KEY`];
      const provider = getDefaultProvider('sepolia');
      // @ts-ignore
      const signer = new Wallet(privateToken, provider);
      try {
        const client = await Client.create(signer, {
          apiClientFactory: GrpcApiClient.fromOptions as any,
          basePersistence: new RedisPersistence(redis as any, "xmtp:"),
          env: (process.env.XMTP_ENV as XmtpEnv) ?? "dev",
        });
        console.log(
          `Client initialized at: ${client.address} for ${config.id}`
        );
        clients.set(config.address, client);
      } catch (err) {
        console.log(err);
      }
    })
  );
}

export const getXmtpClient = async (address: string) => {
  if (!clientsInitialized) {
    console.log("Clients not initialized");
    await initializeClients();
  }
  return clients.get(address) ?? null;
};
