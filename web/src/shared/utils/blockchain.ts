const test = new Map([
  [2810, 'Holesky Morph Testnet'],
  [88882, 'Chiliz Spicy Testnet'],
  [31, 'Rootstock Testnet'],
  [296, 'Hedera Testnet'],
]);

export const blockchainName = (id: string) => {
  const chainId = Number(id.split('_')[0]);
  return test.get(chainId) || chainId;
};
