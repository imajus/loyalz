import { mapValues } from 'lodash';
import { ActionConfirmationStatus } from '@stackr/sdk';
import express from 'express';
import { machine } from './machine.js';
import { rollup } from './rollup.js';
import * as schemas from './schemas.js';
import { transitions } from './transitions.js';

const { config, getStfSchemaMap, submitAction } = rollup;
const transitionToSchema = getStfSchemaMap();
const server = express();

server.use(express.json());

// allow CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

server.get('/info', (req, res) => {
  res.send({
    isSandbox: config.isSandbox,
    domain: config.domain,
    transitionToSchema,
    schemas: Object.values(schemas).reduce(
      (acc, schema) => ({
        ...acc,
        [schema.identifier]: {
          primaryType: schema.EIP712TypedData.primaryType,
          types: schema.EIP712TypedData.types,
        },
      }),
      {},
    ),
  });
});

server.post('/:transition', async (req, res) => {
  const { transition } = req.params;
  if (!transitions[transition]) {
    res.status(400).send({ message: 'NO_TRANSITION_FOR_ACTION' });
    return;
  }
  try {
    const { msgSender, signature, inputs } = req.body;
    const schemaId = transitionToSchema[transition];
    const schema = Object.values(schemas).find(
      (schema) => schema.identifier === schemaId,
    );
    if (!schema) {
      throw new Error('NO_SCHEMA_FOUND');
    }
    const signedAction = schema.actionFrom({
      msgSender,
      signature,
      inputs,
    });
    const ack = await submitAction(transition, signedAction);
    const { logs, errors } = await ack.waitFor(ActionConfirmationStatus.C1);
    if (errors?.length) {
      throw new Error(errors[0].message);
    }
    res.status(201).send({ logs, ackHash: ack.hash });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
  return;
});

server.get('/', (req, res) => {
  res.json({ state: machine.state });
});

export { server };
