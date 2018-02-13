var bootStart = new Date();
const NeptuneClient = require('./Framework/NeptuneClient');
const config = require('./config.json');

const client = new NeptuneClient(config);

client.login(require(config.loginToken).loginToken);
