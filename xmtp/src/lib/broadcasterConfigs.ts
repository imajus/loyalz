interface BroadcastConfig {
  address: string;
  greeting: string;
  id: string;
}

const broadcastConfigs: BroadcastConfig[] = [
  {
    address: "0xb1991BA7297408733EB47Eb9c0d2d8Ab5Eb918A2",
    greeting: "Welcome Loyalz XMTP Broadcasts",
    id: "XMTP",
  },
];

interface BroadcastConfigEntities {
  addresses: string[];
  map: { [address: string]: BroadcastConfig };
}

export const broadCastConfigEntities = broadcastConfigs.reduce(
  (acc, config) => {
    acc.addresses.push(config.address);
    acc.map[config.address] = config;
    return acc;
  },
  { addresses: [], map: {} } as BroadcastConfigEntities
);
