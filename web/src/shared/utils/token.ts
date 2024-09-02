export const shortHash = (hash: string) => {
  return `${hash.slice(2, 4)}..${hash.slice(-2)}`;
};

export const productName = (sku: string) => {
  if (sku.length < 5) return sku;

  return shortHash(sku);
};

export const brandName = (manager: string) => {
  if (manager.length < 5) return manager;

  return shortHash(manager);
};

export const tokenName = (address: string) => {
  if (address.length < 5) return address;

  return shortHash(address);
};
