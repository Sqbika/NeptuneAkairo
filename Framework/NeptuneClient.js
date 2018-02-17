const { AkairoClient, SequelizeProvider } = require('discord-akairo');

class NeptuneClient extends AkairoClient {
	constructor(config) {
		super({
			ownerID: config.ownerID,
			prefix: config.prefix,
			allowMention: true,
			commandDirectory: config.commandDirectory,
			inhibitorDirectory: config.inhibitorDirectory,
			listenerDirectory: config.listenerDirectory,
			disableEveryone: true,
			disabledEvents: ['TYPING_START']
		});

		this.database = require('../postgresql/models.js');
		this.notify = require('./notify');
		this.config = config;
		this.bus = require('./bus.js');
		this.remind = require('./remind');
		this.settings = new SequelizeProvider(this.database.SETTINGS, {
			idColumn: 'Guild',
			dataColumn: 'JSON'
		});
	}

	start(auth) {
		this.login(auth);
		this.bus.addFunction(this.remind.checkReminds, false, 'Reminds');
		this.bus.loop = setInterval(this.bus.execFunctions, 5000);
	}
}

module.exports = NeptuneClient;
