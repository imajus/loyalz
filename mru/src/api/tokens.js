import { last } from 'lodash';
import { machine } from '../machine.js';
import { makeActionHandler, server } from './server.js';
import { MultiTokenERC20 } from './MultiTokenERC20.js';
import { ActionConfirmationStatus } from '@stackr/sdk';
import { rollup } from 'src/rollup.js';
const { actions, getStfSchemaMap, submitAction } = rollup;
const transitionToSchema = getStfSchemaMap();

async function handleAction(name, req) {
  const { msgSender, signature, inputs } = req.body;
  const schemaId = transitionToSchema[name];
  if (/* !transitions[name] ||  */ !schemaId) {
    throw new Error('NO_TRANSITION_FOR_ACTION');
  }
  const schema = actions.getSchema(schemaId);
  if (!schema) {
    throw new Error('NO_SCHEMA_FOUND');
  }
  const signedAction = schema.actionFrom({
    msgSender,
    signature,
    inputs,
  });
  const ack = await submitAction(name, signedAction);
  const { logs, errors } = await ack.waitFor(ActionConfirmationStatus.C1);
  if (errors?.length) {
    throw new Error(errors[0].message);
  }
  return logs;
}

server.get('/mints', (req, res) => {
  res.status(200).send(machine.state.mints);
});

server.post('/mints', async (req, res) => {
  try {
    await handleAction('addReceipt', req);
    const receipt = last(machine.state.receipts);
    const items = await Promise.all(
      receipt.mints.map(async (idx) => {
        const mint = machine.state.mints[idx];
        const [chainId, token] = mint.token.split(':');
        const tokenName = await MultiTokenERC20.getTokenName(chainId, token);
        return MultiTokenERC20.mintTokens(
          chainId,
          tokenName,
          mint.customer,
          mint.amount,
        );
      }),
    );
    return res.status(200).send({ items });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

server.get('/burns', (req, res) => {
  res.status(200).send(machine.state.burns);
});

server.post('/burns', async (req, res) => {
  try {
    await handleAction('claimReward', req);
    const burns = machine.state.burns.slice(-2);
    const items = await Promise.all(
      burns.map(async (burn) => {
        const [chainId, token] = burn.token.split(':');
        const tokenName = await MultiTokenERC20.getTokenName(chainId, token);
        return MultiTokenERC20.burnTokens(
          chainId,
          tokenName,
          burn.customer,
          burn.amount,
        );
      }),
    );
    return res.status(200).send({ items });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

server.post('/tokens', async (req, res) => {
  const { chainId, symbol } = req.body;
  const { link, hash } = await MultiTokenERC20.createToken(
    chainId,
    symbol,
    symbol,
  );
  return res.status(200).send({ link, hash });
});

server.post('/exchange', makeActionHandler('claimReward'));
