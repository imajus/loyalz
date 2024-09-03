import { ethers } from "hardhat";


import type { MultiTokenERC20, MintableBurnableERC20 } from "../../../../typechain-types";

async function main() {
  console.log("Deploying MultiTokenERC20 contract...");
  const address = "0x300cafC93dAD01f46fdA7FF5f344d9543E4eB03a";

  const [deployer] = await ethers.getSigners();
  //console.log("Deploying MultiTokenERC20 contract... with", deployer.address);
  //const signer = await ethers.getSigners();

  const MultiTokenERC20 = await ethers.deployContract("MultiTokenERC20");
  //const multiTokenERC20 = await MultiTokenERC20Factory.connect(deployer).deploy({gasLimit: 20000000 });
  //const multiTokenERC20 = await MultiTokenERC20Factory.deploy() as MultiTokenERC20;

  await MultiTokenERC20.waitForDeployment();

  console.log("MultiTokenERC20 deployed to:", await MultiTokenERC20.getAddress());

  // Create a new token
  const tokenName = "MyToken";
  const tokenSymbol = "MTK";
  console.log(`Creating new token: ${tokenName} (${tokenSymbol})`);
  const tx = await MultiTokenERC20.createToken(tokenName, tokenSymbol);
  const receipt = await tx.wait();

  const tokenCreatedEvent = receipt.events?.find((e: any) => e.event === 'TokenCreated');
    if (tokenCreatedEvent) {
        console.log("Token created successfully");
        console.log("Token address:", tokenCreatedEvent.args.tokenAddress);
    } else {
        console.error("Token creation event not found");
    }

    // Verify token address
  //const tokenAddress = await MultiTokenERC20.tokens("MyToken");
  //console.log("Token address from contract:", tokenAddress);

  // Get the token address
  const tokenAddress = await MultiTokenERC20.getTokenAddress(tokenName);
  console.log(`Token address: ${tokenAddress}`);

  // Mint some tokens
  const [owner] = await ethers.getSigners();
  const recipient = await owner.getAddress(); // Using the deployer's address for simplicity
  const mintAmount = ethers.parseEther("1000"); // 1000 tokens
  console.log(`Minting ${ethers.formatEther(mintAmount)} tokens to ${recipient}`);
  const tx1 = await MultiTokenERC20.mintTokens(tokenName, recipient, mintAmount);
  const receipt1 = await tx1.wait();
  const tokenMintedEvent = receipt.events?.find((e: any) => e.event === 'TokensMinted');
    if (tokenMintedEvent) {
        console.log("Token Minted successfully");
        console.log("Token address:", tokenCreatedEvent.args.tokenAddress);
    } else {
        console.error("Token Minted event not found");
    }


  // Check balance
  const tokenContract = await ethers.getContractAt("MintableBurnableERC20", tokenAddress) as MintableBurnableERC20;
  const balance = await tokenContract.balanceOf(tokenAddress);
  console.log(`Balance of ${recipient}: ${ethers.formatEther(balance)} ${tokenSymbol}`);

  // Burn some tokens
  const burnAmount = ethers.parseEther("100"); // 100 tokens
  console.log(`Approving and burning ${ethers.formatEther(burnAmount)} tokens from ${recipient}`);

  // Approve the MultiTokenERC20 contract to spend tokens
  //await tokenContract.approve(await MultiTokenERC20.getAddress(), burnAmount);

  // Burn the tokens
  const tx2 = await MultiTokenERC20.burnTokens(tokenName, recipient, burnAmount);
  const receipt2 = await tx2.wait();

  // Check balance again
  const newBalance = await tokenContract.balanceOf(recipient);
  console.log(`New balance of ${recipient}: ${ethers.formatEther(newBalance)} ${tokenSymbol}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });