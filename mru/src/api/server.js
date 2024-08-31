import { ActionConfirmationStatus } from '@stackr/sdk';
import express from 'express';
import { machine } from '../machine.js';
import { rollup } from '../rollup.js';

const { actions, config, getStfSchemaMap, submitAction } = rollup;
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

server.get('/', (req, res) => {
  res.json({ state: machine.state });
});

server.get('/info', (req, res) => {
  res.send({
    isSandbox: config.isSandbox,
    domain: config.domain,
    transitionToSchema,
    schemas: actions.getAllSchemas().reduce(
      (acc, schema) => ({
        ...acc,
        [schema.identifier]: {
          primaryType: schema.identifier,
          types: schema.types,
        },
      }),
      {},
    ),
  });
});

export function makeActionHandler(name) {
  const schemaId = transitionToSchema[name];
  if (/* !transitions[name] ||  */ !schemaId) {
    throw new Error('NO_TRANSITION_FOR_ACTION');
  }
  const schema = actions.getSchema(schemaId);
  if (!schema) {
    throw new Error('NO_SCHEMA_FOUND');
  }
  return async (req, res) => {
    try {
      const { msgSender, signature, inputs } = req.body;
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
      res.status(201).send({ logs, ackHash: ack.hash });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
    return;
  };
}

export { server };
