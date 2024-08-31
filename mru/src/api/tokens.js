import { machine } from '../machine.js';
import { makeActionHandler, server } from './server.js';

server.get('/mints', (req, res) => {
  res.status(200).send(machine.state.mints);
});

server.get('/burns', (req, res) => {
  res.status(200).send(machine.state.burns);
});

server.post('/exchange', makeActionHandler('claimReward'));