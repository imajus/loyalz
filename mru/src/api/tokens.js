import { machine } from '../machine.js';
import { makeActionHandler, server } from './server.js';
import { ContractFactory } from 'ethers';

server.get('/mints', (req, res) => {
  res.status(200).send(machine.state.mints);
});

server.get('/burns', (req, res) => {
  res.status(200).send(machine.state.burns);
});

server.post('/tokens', (req, res) => {
  const { chainId, symbol, allowance } = req.body;
  //TODO: handle
  return res.status(200).send({ address: '0x0' });
});

server.post('/exchange', makeActionHandler('claimReward'));
