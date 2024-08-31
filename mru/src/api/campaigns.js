import { machine } from '../machine.js';
import { makeActionHandler, server } from './server.js';

server.get('/campaigns', (req, res) => {
  res.status(200).send(machine.state.campaigns);
});

server.post('/campaigns', makeActionHandler('createCampaign'));

server.post('/retailers/whitelist', makeActionHandler('whitelistRetailer'));

server.post('/retailers/delist', makeActionHandler('delistRetailer'));