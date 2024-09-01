import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";
require("@nomiclabs/hardhat-etherscan");
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  etherscan: {
    apiKey: {
      morphTestnet: 'anything',
    },
  networks: {
    morphHolesky: {
      url: 'https://rpc-quicknode-holesky.morphl2.io',
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY as string]
          : [],
    },
  },
};

export default config;
