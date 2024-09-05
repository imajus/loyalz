import { LitNodeClientNodeJs } from "@lit-protocol/lit-node-client-nodejs";
import { LIT_RPC } from "@lit-protocol/constants";
import {
  createSiweMessage,
  generateAuthSig,
  LitAbility,
  LitActionResource,
} from "@lit-protocol/auth-helpers";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import * as ethers from "ethers";
import { litActionCode } from "./litAction.js";
import config from './config.js';

export const conditionalSigning = async () => {
  let litNodeClient: LitNodeClientNodeJs;
  let pkpInfo: {
    tokenId?: string;
    publicKey?: string;
    ethAddress?: string;
  } = {
    publicKey: config.pkpPublicKey,
  };
  try {
    const ethersWallet = new ethers.Wallet(
      config.privateKey,
      new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
    );

    console.log("🔄 Connecting to the Lit network...");
    litNodeClient = new LitNodeClientNodeJs({
      litNetwork: config.network,
      debug: config.debug,
    });
    await litNodeClient.connect();
    console.log("✅ Connected to the Lit network");

    console.log("🔄 Connecting LitContracts client to network...");
    const litContracts = new LitContracts({
      signer: ethersWallet,
      network: config.network,
      debug: config.debug,
    });
    await litContracts.connect();
    console.log("✅ Connected LitContracts client to network");

    if (!config.pkpPublicKey) {
      console.log("🔄 PKP wasn't provided, minting a new one...");
      pkpInfo = (await litContracts.pkpNftContractUtils.write.mint()).pkp;
      console.log("✅ PKP successfully minted");
      console.log(`ℹ️  PKP token ID: ${pkpInfo.tokenId}`);
      console.log(`ℹ️  PKP public key: ${pkpInfo.publicKey}`);
      console.log(`ℹ️  PKP ETH address: ${pkpInfo.ethAddress}`);
    } else {
      console.log(`ℹ️  Using provided PKP: ${config.pkpPublicKey}`);
      pkpInfo = {
        publicKey: config.pkpPublicKey,
        ethAddress: ethers.utils.computeAddress(`0x${config.pkpPublicKey}`),
      };
    }

    let capacityTokenId = config.creditTokenId;
    if (capacityTokenId === "" || capacityTokenId === undefined) {
      console.log("🔄 No Capacity Credit provided, minting a new one...");
      capacityTokenId = (
        await litContracts.mintCapacityCreditsNFT({
          requestsPerKilosecond: 10,
          daysUntilUTCMidnightExpiration: 1,
        })
      ).capacityTokenIdStr;
      console.log(`✅ Minted new Capacity Credit with ID: ${capacityTokenId}`);
    } else {
      console.log(
        `ℹ️  Using provided Capacity Credit with ID: ${config.creditTokenId}`
      );
    }

    console.log("🔄 Creating capacityDelegationAuthSig...");
    const { capacityDelegationAuthSig } =
      await litNodeClient.createCapacityDelegationAuthSig({
        dAppOwnerWallet: ethersWallet,
        capacityTokenId,
        delegateeAddresses: [ethersWallet.address],
        uses: "1",
      });
    console.log("✅ Capacity Delegation Auth Sig created");

    console.log("🔄 Executing Lit Action...");
    const litActionSignatures = await litNodeClient.executeJs({
      sessionSigs: await litNodeClient.getSessionSigs({
        chain: config.chainToCheckConditionOn,
        capabilityAuthSigs: [capacityDelegationAuthSig],
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
        resourceAbilityRequests: [
          {
            resource: new LitActionResource("*"),
            ability: LitAbility.LitActionExecution,
          },
        ],
        authNeededCallback: async ({
          resourceAbilityRequests,
          expiration,
          uri,
        }) => {
          const toSign = await createSiweMessage({
            uri: uri!,
            expiration: expiration!, // 24 hours
            resources: resourceAbilityRequests!,
            walletAddress: await ethersWallet.getAddress(),
            nonce: await litNodeClient.getLatestBlockhash(),
            litNodeClient: litNodeClient,
          });

          return await generateAuthSig({
            signer: ethersWallet,
            toSign,
          });
        },
      }),
      code: litActionCode,
      jsParams: {
        conditions: [
          {
            conditionType: "evmBasic",
            contractAddress: "",
            standardContractType: "",
            chain: config.chainToCheckConditionOn,
            method: "eth_getBalance",
            parameters: [":userAddress", "latest"],
            returnValueTest: {
              comparator: ">=",
              value: "1",
            },
          },
        ],
        authSig: await (async () => {
          const toSign = await createSiweMessage({
            uri: "http://localhost",
            expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
            walletAddress: await ethersWallet.getAddress(),
            nonce: await litNodeClient.getLatestBlockhash(),
            resources: [
              {
                resource: new LitActionResource("*"),
                ability: LitAbility.LitActionExecution,
              },
            ],
            litNodeClient: litNodeClient,
          });
          return await generateAuthSig({
            signer: ethersWallet,
            toSign,
          });
        })(),
        chain: config.chainToCheckConditionOn,
        dataToSign: ethers.utils.arrayify(ethers.utils.keccak256([1, 2, 3, 4, 5])),
        publicKey: pkpInfo.publicKey,
      },
    });
    console.log("✅ Lit Action executed successfully");

    return litActionSignatures;
  } catch (error) {
    console.error(error);
  } finally {
    litNodeClient!.disconnect();
  }
};
