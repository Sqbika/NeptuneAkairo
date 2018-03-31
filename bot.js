var bootStart = new Date();
const NeptuneClient = require('./Framework/NeptuneClient');
const config = require('./config.json');

const client = new NeptuneClient(config);

client.start(require(config.loginToken).loginToken);

process.on('unhandledRejection', error => {
    console.log(error);
  });