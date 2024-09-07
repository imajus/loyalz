import { HardhatUserConfig } from 'hardhat/config';
import * as dotenv from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-ethers';
import '@typechain/hardhat';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    morphHolesky: {
      url: 'https://rpc-quicknode-holesky.morphl2.io',
      accounts: [process.env.PRIVATE_KEY as string],
    },
    chiliz_spicy: {
      url: 'https://spicy-rpc.chiliz.com',
      accounts: [process.env.PRIVATE_KEY as string],
    },
    rskTestnet: {
      url: 'https://rpc.testnet.rootstock.io/HTO2TWpdTGdGIBo3vgOe230Drz6lTW-T',
      // chainId: 31,
      //gasPrice: 60000000,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    hederaTestnet: {
      url: 'https://testnet.hashio.io/api',
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: {
      morphHolesky: '.',
      chiliz_spicy: '.',
      rskTestnet: '.',
      hederaTestnet: '.',
    },
    customChains: [
      {
        network: 'morphHolesky',
        chainId: 2810,
        urls: {
          apiURL: 'https://explorer-api-holesky.morphl2.io/api',
          browserURL: 'https://explorer-holesky.morphl2.io/',
        },
      },
      {
        network: 'chiliz_spicy',
        chainId: 88882,
        urls: {
          apiURL:
            'https://api.routescan.io/v2/network/testnet/evm/88882/etherscan',
          browserURL: 'https://testnet.chiliscan.com/',
        },
      },
      {
        network: 'rskTestnet',
        chainId: 31,
        urls: {
          apiURL: 'https://explorer.testnet.rsk.co/api',
          browserURL: 'https://explorer.testnet.rsk.co/',
        },
      },
      {
        network: 'hederaTestnet',
        chainId: 296,
        urls: {
          apiURL: 'https://hashscan.io/testnet/api',
          browserURL: 'https://hashscan.io/testnet/',
        },
      },
    ],
  },
};

export default config;
