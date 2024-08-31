import { server } from 'src/api/index.js';
import { rollup } from './src/rollup.js';

const main = async () => {
  // Init Micro-rollup
  await rollup.init();
  // Init HTTP API server
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

main();
