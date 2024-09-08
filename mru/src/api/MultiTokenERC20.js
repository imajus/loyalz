import * as ethers from 'ethers';
import MultiTokenERC20Definition from 'src/abi/MultiTokenERC20.json';

// Replace with your contract's ABI
const contractABI = MultiTokenERC20Definition.abi;

const CHAIN_DATA = {
  '2810': {
    rpc: 'https://rpc-quicknode-holesky.morphl2.io',
    address: '0x66D6B6483ec46abD950256880F39Ba56dc1b1a7f',
    explorer: 'https://explorer-holesky.morphl2.io/tx',
  },
  '88882': {
    rpc: 'https://spicy-rpc.chiliz.com',
    address: '0x8c4F510229863854ecD6fB0d7161d1aB5336cc27',
    explorer: 'https://testnet.chiliscan.com/tx',
  },
  '31': {
    rpc: 'https://rpc.testnet.rootstock.io/L6ZhwA295IZEj8TgDgtnlNnoVumEws-T',
    address: '0xaE7902b8050ef5204C74b5cbC5a2b91Ac6140D2d',
    explorer: 'https://explorer.testnet.rsk.co/tx',
  },
  '296': {
    rpc: 'https://testnet.hashio.io/api',
    address: '0xdfAab04Fbe10E5f9AfB653e797EA8AE31ECaB715',
    explorer: 'https://hashscan.io/testnet/tx',
  },
};

// Function to get a contract instance
function getContractInstance(chainId) {
  if (!(chainId in CHAIN_DATA)) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  const { rpc, address } = CHAIN_DATA[chainId];
  const provider = ethers.getDefaultProvider(rpc);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  return new ethers.Contract(address, contractABI, signer);
}

// Main interaction functions
export const MultiTokenERC20 = {
  // Create a new token
  createToken: async (chainId, name, symbol) => {
    const contract = getContractInstance(chainId);
    const tx = await contract.createToken(name, symbol);
    const receipt = await tx.wait();
    console.log(`Token created: ${name} (${symbol})`);
    console.log(`Transaction hash: ${tx.hash}`);
    return {
      receipt,
      hash: tx.hash,
      link: `${CHAIN_DATA[chainId].explorer}/${tx.hash}`,
    };
  },

  // Mint tokens
  mintTokens: async (chainId, tokenName, to, amount) => {
    const contract = getContractInstance(chainId);
    const tx = await contract.mintTokens(
      tokenName,
      to,
      ethers.parseEther(amount),
    );
    const receipt = await tx.wait();
    console.log(`Minted ${amount} ${tokenName} tokens to ${to}`);
    console.log(`Transaction hash: ${tx.hash}`);
    return {
      receipt,
      hash: tx.hash,
      link: `${CHAIN_DATA[chainId].explorer}/${tx.hash}`,
    };
  },

  // Burn tokens
  burnTokens: async (chainId, tokenName, from, amount) => {
    const contract = getContractInstance(chainId);
    const tx = await contract.burnTokens(
      tokenName,
      from,
      ethers.parseEther(amount),
    );
    const receipt = await tx.wait();
    console.log(`Burned ${amount} ${tokenName} tokens from ${from}`);
    console.log(`Transaction hash: ${tx.hash}`);
    return {
      receipt,
      hash: tx.hash,
      link: `${CHAIN_DATA[chainId].explorer}/${tx.hash}`,
    };
  },

  // Get token balance
  getBalance: async (chainId, tokenName, address) => {
    const contract = getContractInstance(chainId);
    const balance = await contract.balanceOf(tokenName, address);
    return ethers.formatEther(balance);
  },

  getTokenName: async (chainId, address) => {
    //TODO: Implement
    return {
      '88882:0x7556403BaC4Bb71F09f3b3C2Fdb6f9C461CAe712': 'RCC',
      '2810:0x4a68cb5b99b6e1db5745eeabde38c5b12aa0ce55': 'RCRC',
    }[`${chainId}:${address}`];
  },

  // Get token address
  getTokenAddress: async (chainId, tokenName) => {
    const contract = getContractInstance(chainId);
    return await contract.tokens(tokenName);
  },

  // Approve token burn
  approveTokenBurn: async (chainId, tokenName, amount) => {
    const contract = getContractInstance(chainId);
    const tx = await contract.approveTokenBurn(
      tokenName,
      ethers.parseEther(amount),
    );
    const receipt = await tx.wait();
    console.log(`Approved burn of ${amount} ${tokenName} tokens`);
    return receipt;
  },
};
