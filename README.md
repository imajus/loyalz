## Overview

An innovative platform revolutionizing loyalty program management by seamlessly integrating offline retailers into the blockchain ecosystem.

Check out [live demo](https://loyalz.vercel.app/).

## Description

Traditional web-based loyalty program platforms uniformly suffer from inherent challenges that render them prohibitively expensive for small businesses and unappealing for the end users. It's time to put an end to that by integrating brands, retailers and customers onto a blockchain ecosystem.

Brands demand:
1. Fare rewards distribution among marketing campaign participants
1. Easy and quick setup for collaborations with other brands  
1. Verifiable marketing campaign reports to be used for accounting purposes

Retailers demand:
1. Convert tons of paper receipts thrown away every day to something meaningful
1. Attract more customers to engage with their business

Customers demands:
1. Ownership and more freedom of rebate points management
1. Get involved into loyalty programs, but without a hustle of installing mobile apps for each brand or retailer
1. Play around with blockchain and web3 ecosystem

Our platform satisfies all of the aforementioned demands by providing all three actors a user-friendly yet powerful interface to blockchain:

1. Brand Managers can set up marketing campaigns tied to custom ERC-20 tokens
1. Customers can scan QR code on paper receipts to receive rebate points in a form of custom ERC-20 token
1. Retailers can exchange customers rebate points to rewards 

We believe that we've managed to combine all the technologies and protocols the platform was built upon in the most meaningful way possible.

## How it's made

Our platform consist of multiple projects which communicate over HTTP REST API:

1. Frontend is built with Next.js and utilizes Web3Auth for social login, account abstraction and transactions signing for the Micro-rollup. XMTP is utilised for subscribing and broadcasting news.
1. MRU backend is Node.js program based on Stackr's Micro-rollups framework and also acts as a relayer for on-chain ERC-20 tokens management. We use Avail as a DA layer for the MRU.
1. Hardhat project is used to deploy two custom Smart Contracts: `MultiTokenERC20` and `MintableBurnableERC20`.
1. Envio indexer is a separate program which keeps track of logs from all custom ERC-20 tokens created via the platform and provides HTTP REST API endpoint for the Frontend to consume for listing tokens and providing analytics data for the Brand Managers.

Our smart contract was deployed to the following blockchains:
- [Morph Holesky Testnet](https://explorer-holesky.morphl2.io/address/0x66D6B6483ec46abD950256880F39Ba56dc1b1a7f)
- [Chiliz Spicy Testnet](https://testnet.chiliscan.com/address/0x8c4F510229863854ecD6fB0d7161d1aB5336cc27)
- [Rootstock Testnet](https://explorer.testnet.rootstock.io/address/0xaE7902b8050ef5204C74b5cbC5a2b91Ac6140D2d)
- [Hedera Testnet](https://hashscan.io/testnet/contract/0xdfAab04Fbe10E5f9AfB653e797EA8AE31ECaB715)

# Resources

- [Use cases diagram](https://excalidraw.com/#json=ICLxMr_dfgCXPDfxktALl,jEX3kfta9Qg8SX6ECnkQUg)
- Sequence diagrams:
  - [Customer activities](https://www.mermaidchart.com/raw/5b481313-df01-4860-9325-2343c0a97aa7?theme=light&version=v0.1&format=png)
  - [Retailer activities](https://www.mermaidchart.com/raw/239c6c94-35e9-4217-a442-cf480205cead?theme=dark&version=v0.1&format=png)
  - [Brand Manager: Tokens management](https://www.mermaidchart.com/raw/c7acd547-a930-4fb1-81cc-c40d7f76e433?theme=dark&version=v0.1&format=png)
  - [Brand Manager: Campaigns management](https://www.mermaidchart.com/raw/d54b1787-6af7-4d76-acf8-4cb5a79a4038?theme=dark&version=v0.1&format=png)
