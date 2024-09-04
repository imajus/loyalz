import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";
//require("@nomiclabs/hardhat-etherscan");
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    morphHolesky: {
      url: 'https://rpc-quicknode-holesky.morphl2.io',
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY as string]
          : [],
    },
    chiliz_spicy: {
      url: 'https://spicy-rpc.chiliz.com',
      accounts: [process.env.PRIVATE_KEY as string]
    },
    rskTestnet: {
      url: "https://rpc.testnet.rootstock.io/HTO2TWpdTGdGIBo3vgOe230Drz6lTW-T",
      chainId: 31,
      //gasPrice: 60000000,
      accounts: [process.env.PRIVATE_KEY as string]
    },
  },
  etherscan: {
    apiKey: {
      morphTestnet: 'anything',
    },
    customChains: [
      {
        network: 'morphTestnet',
        chainId: 2810,
        urls: {
          apiURL: 'https://explorer-api-holesky.morphl2.io/api? ',
          browserURL: 'https://explorer-holesky.morphl2.io/',
        },
      },
    ],
  },
};

export default config;
