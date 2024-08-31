import { machine } from '../machine.js';
import { makeActionHandler, server } from './server.js';

server.get('/receipts', (req, res) => {
  res.status(200).send(machine.state.receipts);
});

server.post('/receipts', makeActionHandler('addReceipt'));