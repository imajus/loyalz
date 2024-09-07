const ethers = require('ethers');
import { MultiTokenABI } from "src/abi/MultiTokenERC20";


// Replace with your contract's ABI
const contractABI = MultiTokenABI;

// Replace with your deployed contract address
const contractAddress = "0xYourContractAddressHere";

// Function to get a contract instance
function getContractInstance(signer) {
  return new ethers.Contract(contractAddress, contractABI, signer);
}

// Main interaction functions
const MultiTokenERC20 = {
  // Create a new token
  createToken: async (signer, name, symbol) => {
    const contract = getContractInstance(signer);
    const tx = await contract.createToken(name, symbol);
    const receipt = await tx.wait();
    console.log(`Token created: ${name} (${symbol})`);
    return receipt;
  },

  // Mint tokens
  mintTokens: async (signer, tokenName, to, amount) => {
    const contract = getContractInstance(signer);
    const tx = await contract.mintTokens(tokenName, to, ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    console.log(`Minted ${amount} ${tokenName} tokens to ${to}`);
    return receipt;
  },

  // Burn tokens
  burnTokens: async (signer, tokenName, from, amount) => {
    const contract = getContractInstance(signer);
    const tx = await contract.burnTokens(tokenName, from, ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    console.log(`Burned ${amount} ${tokenName} tokens from ${from}`);
    return receipt;
  },

  // Get token balance
  getBalance: async (signer, tokenName, address) => {
    const contract = getContractInstance(signer);
    const balance = await contract.balanceOf(tokenName, address);
    return ethers.utils.formatEther(balance);
  },

  // Get token address
  getTokenAddress: async (signer, tokenName) => {
    const contract = getContractInstance(signer);
    return await contract.tokens(tokenName);
  },

  // Approve token burn
  approveTokenBurn: async (signer, tokenName, amount) => {
    const contract = getContractInstance(signer);
    const tx = await contract.approveTokenBurn(tokenName, ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    console.log(`Approved burn of ${amount} ${tokenName} tokens`);
    return receipt;
  },
};