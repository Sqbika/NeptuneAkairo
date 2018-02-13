const { AkairoClient, SequelizeProvider } = require('discord-akairo');

class NeptuneClient extends AkairoClient {
<<<<<<< HEAD
	constructor(config) {
		super({
			ownerID: config.ownerID,
=======
    constructor(config) {
        super({
            ownerID: config.ownerID,
>>>>>>> 96472f2e4f79e654fbb2b73caf33857361157a59
	        prefix: config.prefix,
	        allowMention: true,
	        commandDirectory: config.commandDirectory,
	        inhibitorDirectory: config.inhibitorDirectory,
	        listenerDirectory: config.listenerDirectory,
	        disableEveryone: true,
	        disabledEvents: ['TYPING_START']
		});
<<<<<<< HEAD
	}
}
=======

		this.database = require('../postgresql/models.js');
		this.config = config;
		this.bus = require('./bus.js');
		this.remind = require('./remind');
		this.settings = new SequelizeProvider(this.database.SETTINGS, {
			idColumn: 'Guild',
			dataColumn: 'JSON'
		});
	}
}
>>>>>>> 96472f2e4f79e654fbb2b73caf33857361157a59
