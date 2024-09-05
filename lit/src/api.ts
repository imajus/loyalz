import { LitNodeClientNodeJs } from '@lit-protocol/lit-node-client-nodejs';
import { LIT_RPC } from '@lit-protocol/constants';
import {
  LitAbility,
  LitActionResource,
  LitPKPResource,
} from '@lit-protocol/auth-helpers';
import { AuthMethodScope, AuthMethodType } from '@lit-protocol/constants';
import { LitContracts } from '@lit-protocol/contracts-sdk';
import * as ethers from 'ethers';
import bs58 from 'bs58';
import IpfsHash from 'ipfs-only-hash';
import config from './config.js';
import authAction from './actions/auth.js';
import signAction from './actions/sign.js';

const getPkpInfoFromMintReceipt = async (
  txReceipt: ethers.ContractReceipt,
  litContractsClient: LitContracts
) => {
  const pkpMintedEvent = txReceipt!.events!.find(
    (event) =>
      event.topics[0] ===
      '0x3b2cc0657d0387a736293d66389f78e4c8025e413c7a1ee67b7707d4418c46b8'
  );
  const publicKey = '0x' + pkpMintedEvent!.data.slice(130, 260);
  const tokenId = ethers.utils.keccak256(publicKey);
  const ethAddress = await litContractsClient.pkpNftContract.read.getEthAddress(
    tokenId
  );
  return {
    tokenId: ethers.BigNumber.from(tokenId).toString(),
    publicKey,
    ethAddress,
  };
};

export const conditionalSigning = async () => {
  const telegramUser = JSON.parse(config.telegramUserData);
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

    console.log('🔄 Connecting to the Lit network...');
    litNodeClient = new LitNodeClientNodeJs({
      litNetwork: config.network,
      debug: config.debug,
    });
    await litNodeClient.connect();
    console.log('✅ Connected to the Lit network');

    console.log('🔄 Connecting LitContracts client to network...');
    const litContracts = new LitContracts({
      signer: ethersWallet,
      network: config.network,
      debug: config.debug,
    });
    await litContracts.connect();
    console.log('✅ Connected LitContracts client to network');

    console.log('🔄 Generating Auth Method type and ID...');
    const authMethodType = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes('Lit Developer Guide Telegram Auth Example')
    );
    const authMethodId = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(`telegram:${telegramUser.id}`)
    );
    console.log('✅ Generated Auth Method type and ID');

    if (!config.pkpPublicKey) {
      console.log("ℹ️ PKP wasn't provided");
      console.log('🔄 Getting PKP mint cost...');
      const pkpMintCost = await litContracts.pkpNftContract.read.mintCost();
      console.log('✅ Got PKP mint cost');
      console.log('🔄 Calculating the IPFS CID for Lit Action code string...');
      const litActionIpfsCid = await IpfsHash.of(signAction);
      console.log(
        `✅ Calculated IPFS CID: ${litActionIpfsCid}. Hexlified version: 0x${Buffer.from(
          bs58.decode(litActionIpfsCid)
        ).toString('hex')}`
      );
      console.log('🔄 Minting new PKP...');
      const tx =
        await litContracts.pkpHelperContract.write.mintNextAndAddAuthMethods(
          AuthMethodType.LitAction, // keyType
          [AuthMethodType.LitAction, authMethodType], // permittedAuthMethodTypes
          [
            `0x${Buffer.from(bs58.decode(litActionIpfsCid)).toString('hex')}`,
            authMethodId,
          ], // permittedAuthMethodIds
          ['0x', '0x'], // permittedAuthMethodPubkeys
          [[AuthMethodScope.SignAnything], [AuthMethodScope.NoPermissions]], // permittedAuthMethodScopes
          true, // addPkpEthAddressAsPermittedAddress
          true, // sendPkpToItself
          { value: pkpMintCost }
        );
      const receipt = await tx.wait();
      console.log(`✅ Minted new PKP`);
      pkpInfo = await getPkpInfoFromMintReceipt(receipt, litContracts);
    } else {
      console.log(`ℹ️  Using provided PKP`);
      const tokenId = ethers.utils.keccak256(config.pkpPublicKey);
      const ethAddress = await litContracts.pkpNftContract.read.getEthAddress(tokenId);
      pkpInfo = {
        publicKey: config.pkpPublicKey,
        tokenId: ethers.BigNumber.from(tokenId).toString(),
        ethAddress,
      };
    }

    console.log(`ℹ️ PKP Public Key: ${pkpInfo.publicKey}`);
    console.log(`ℹ️ PKP Token ID: ${pkpInfo.tokenId}`);
    console.log(`ℹ️ PKP ETH Address: ${pkpInfo.ethAddress}`);

    // DEBUG
    // console.log('🔄 Checking permitted auth methods...');
    // const permittedAuthMethods =
    //   await litContracts.pkpPermissionsContract.read.getPermittedAuthMethods(
    //     pkpInfo.tokenId
    //   );
    // console.log(
    //   `✅ Got permitted auth methods: ${JSON.stringify(
    //     permittedAuthMethods,
    //     null,
    //     2
    //   )}`
    // );

    let capacityTokenId = config.creditTokenId;
    if (!capacityTokenId) {
      console.log('🔄 No Capacity Credit provided, minting a new one...');
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

    console.log('🔄 Creating capacityDelegationAuthSig...');
    const { capacityDelegationAuthSig } =
      await litNodeClient.createCapacityDelegationAuthSig({
        dAppOwnerWallet: ethersWallet,
        capacityTokenId,
        delegateeAddresses: [pkpInfo.ethAddress],
        uses: "1",
      });
    console.log('✅ Capacity Delegation Auth Sig created');

    console.log(
      `🔄 Getting the Session Sigs for the PKP using Lit Action code string...`
    );
    // console.log({
    //   pkpPublicKey: pkpInfo.publicKey,
    //   capabilityAuthSigs: [capacityDelegationAuthSig],
    //   litActionCode: Buffer.from(authAction).toString('base64'),
    //   jsParams: {
    //     telegramUserData: config.telegramUserData,
    //     telegramBotSecret: config.botSecret,
    //     pkpTokenId: pkpInfo.tokenId,
    //   },
    //   resourceAbilityRequests: [
    //     {
    //       resource: new LitPKPResource('*'),
    //       ability: LitAbility.PKPSigning,
    //     },
    //     {
    //       resource: new LitActionResource('*'),
    //       ability: LitAbility.LitActionExecution,
    //     },
    //   ],
    //   expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
    // });
    const sessionSigs = await litNodeClient.getPkpSessionSigs({
      pkpPublicKey: pkpInfo.publicKey,
      capabilityAuthSigs: [capacityDelegationAuthSig],
      litActionCode: Buffer.from(authAction).toString('base64'),
      jsParams: {
        telegramUserData: config.telegramUserData,
        telegramBotSecret: config.botSecret,
        pkpTokenId: pkpInfo.tokenId,
      },
      resourceAbilityRequests: [
        {
          resource: new LitPKPResource('*'),
          ability: LitAbility.PKPSigning,
        },
        {
          resource: new LitActionResource('*'),
          ability: LitAbility.LitActionExecution,
        },
      ],
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
    });
    console.log(
      `✅ Got PKP Session Sigs: ${JSON.stringify(sessionSigs, null, 2)}`
    );

    console.log('🔄 Executing Lit Action...');
    const litActionSignatures = await litNodeClient.executeJs({
      sessionSigs,
      code: Buffer.from(signAction).toString('base64'),
      jsParams: {
        dataToSign: ethers.utils.arrayify(
          ethers.utils.keccak256([1, 2, 3, 4, 5])
        ),
        publicKey: pkpInfo.publicKey,
      },
    });
    console.log('✅ Lit Action executed successfully');

    return litActionSignatures;
  } catch (error) {
    console.error(error);
  } finally {
    litNodeClient!.disconnect();
  }
};
