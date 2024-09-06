import { ActionConfirmationStatus } from '@stackr/sdk';
import { rollup } from '../rollup.js';
import { server } from './server.js';

const { actions, getStfSchemaMap, submitAction } = rollup;
const transitionToSchema = getStfSchemaMap();

server.post('/action/:transition', async (req, res) => {
  const { transition } = req.params;
  if (!transitionToSchema[transition]) {
    res.status(400).send({ message: 'NO_TRANSITION_FOR_ACTION' });
    return;
  }
  try {
    const { msgSender, signature, inputs } = req.body;
    const schemaId = transitionToSchema[transition];
    const schema = actions.getSchema(schemaId);
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
