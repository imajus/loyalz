export interface BroadcastConfig {
  id: string;
  name: string;
  address: string;
  greeting: string;
}

export const broadcastConfigs: BroadcastConfig[] = [
  {
    id: 'LB',
    address: '0xb1991BA7297408733EB47Eb9c0d2d8Ab5Eb918A2',
    name: 'Loyalz XMTP Broadcasts',
    greeting: 'Loyalz say thanx for subscribing!',
  },
  // ...put here more configs for testing
];
