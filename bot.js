var bootStart = new Date();
const { AkairoClient } = require('discord-akairo');
const config = require('./config.json');

const client = new AkairoClient({
	ownerID: config.ownerID,
	prefix: config.prefix,
	allowMention: true,
	commandDirectory: config.commandDirectory,
	inhibitorDirectory: config.inhibitorDirectory,
	listenerDirectory: config.listenerDirectory,
	disableEveryone: true,
	disabledEvents: ['TYPING_START']
});

client.login(require(config.loginToken).loginToken);


function boot() {
	client.sqbika = {
		DBMSG: require('./postgresql/models/message'),
		GSETTINGS: require('./postgresql/models/gsettings'),
		REMINDS: require('./postgresql/models/reminds'),
        NEP: require('./postgresql/models/gamindustri'),
		config: config,
		bus: require('./Framework/bus.js'),
		remind: require('./Framework/remind.js'),
        helper: require('./Modules/helper.js'),
        wt: {
            whitelist: require('./JSONS/wt-whitelist.json'),
            whatsnewChannels: ['318345958138314752']
        }
	};
}

function setupFramework() {

}

boot();
