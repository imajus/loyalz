import { solidityPackedKeccak256 } from 'ethers';
import { MerkleTree } from 'merkletreejs';

export const constructTree = (state) => {
  const campaignHaches = state.campaigns.map(
    ({
      name,
      sku,
      mintToken,
      mintAmount,
      reward,
      otherToken,
      otherAmount,
      retailers,
    }) =>
      solidityPackedKeccak256(
        [
          'string',
          'string',
          'string',
          'uint256',
          'string',
          'string',
          'uint256',
          'address[]',
        ],
        [
          name,
          sku,
          mintToken,
          mintAmount,
          reward ?? '',
          otherToken ?? '',
          otherAmount ?? 0,
          retailers ?? [],
        ],
      ),
  );
  const receiptsHashes = state.receipts.map(
    ({ id, customer, sku, quantity, mints }) =>
      solidityPackedKeccak256(
        ['string', 'address', 'string', 'uint256', 'uint256[]'],
        [id, customer, sku, quantity, mints],
      ),
  );
  const mintHashes = state.mints.map(
    ({ campaign, customer, token, amount, timestamp }) =>
      solidityPackedKeccak256(
        ['uint256', 'address', 'string', 'uint256', 'uint256'],
        [campaign, customer, token, amount, timestamp],
      ),
  );
  const burnHashes = state.burns.map(
    ({ campaign, customer, token, amount, timestamp }) =>
      solidityPackedKeccak256(
        ['uint256', 'address', 'string', 'uint256', 'uint256'],
        [campaign, customer, token, amount, timestamp],
      ),
  );
  const campaignsRoot = new MerkleTree(campaignHaches).getHexRoot();
  const receiptsRoot = new MerkleTree(receiptsHashes).getHexRoot();
  const mintsRoot = new MerkleTree(mintHashes).getHexRoot();
  const burnsRoot = new MerkleTree(burnHashes).getHexRoot();
  return new MerkleTree([campaignsRoot, receiptsRoot, mintsRoot, burnsRoot]);
};
