/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
const {
 MultiTokenERC20,
} = require("generated");

MultiTokenERC20.OwnershipTransferred.handler(async ({event, context}) => {
  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.MultiTokenERC20_OwnershipTransferred.set(entity);
});


MultiTokenERC20.TokenCreated.handler(async ({event, context}) => {
  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    name: event.params.name,
    tokenAddress: event.params.tokenAddress,
  };

  context.MultiTokenERC20_TokenCreated.set(entity);
});


MultiTokenERC20.TokensBurned.handler(async ({event, context}) => {
  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    name: event.params.name,
    from: event.params.from,
    amount: event.params.amount,
  };

  context.MultiTokenERC20_TokensBurned.set(entity);
});


MultiTokenERC20.TokensMinted.handler(async ({event, context}) => {
  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    name: event.params.name,
    to: event.params.to,
    amount: event.params.amount,
  };

  context.MultiTokenERC20_TokensMinted.set(entity);
});

