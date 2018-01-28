var bootStart = new Date();
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


function boot() {
	client.sqbika = {
		DBMSG: require('./postgresql/models/message'),
		GSETTINGS: require('./postgresql/models/gsettings'),
		REMINDS: require('./postgresql/models/reminds'),
		NEP: require('./postgresql/models/gamindustri'),
        helper: require('./Modules/helper.js'),
        wt: {
            whitelist: require('./JSONS/wt-whitelist.json'),
            whatsnewChannels: []
        }
	};
}
