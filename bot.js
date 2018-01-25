const { Akairo } = require('discord-akairo');
const config = require('./config.json');

const client = new Akairo({
	ownerID: config.ownerID,
	prefix: config.prefix,
	allowMention: true,
	commandDirectory: config.commandDirectory,
	inhibitorDirectory: config.inhibitorDirectory,
	listenerDirectory: config.listenerDirectory
});

client.login(require(config.loginToken).login);
