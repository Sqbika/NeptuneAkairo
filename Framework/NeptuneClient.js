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
			automateCategories: true,
			disabledEvents: ['TYPING_START'],
			defaultPrompt: {
				timeout:'Prompt has been canceled. Time out.',
				ended: 'Retry limit reached. Please use `' + config.prefix + ' help <command>` for more information',
				cancel: 'Command has been cancelled.',
				retries: 4,
				time: 30000
			},
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
		
		this.Permissions = {
			ARGRelated: (msg) =>{
				const server = this.settings.get(msg.guild.id, 'settings', {admins: []});
				for (const role in msg.member.roles)
					if (server.admins.indexOf(role.id) !== -1) return true;
				return server.admins.indexOf(msg.author.id) !== -1;
			},
			PerCommand: {
				ArgAlert: (msg) => {
					const notifiers = this.settings.get(msg.guild.id, 'settings', {notifiers: []});
					if (this.Permissions.ARGRelated(msg)) return true;
					for (const role in msg.member.roles)
						if (server.notifiers.indexOf(role.id) !== -1) return true;
					return server.notifiers.indexOf(msg.author.id) !== -1;					
				}
			}
		}
	}

	start(auth) {
		this.login(auth);
		this.bus.addFunction(this.remind.checkReminds, false, 'Reminds');
		this.bus.loop = setInterval(this.bus.execFunctions, 5000);
		this.settings.init();
	}
}

module.exports = NeptuneClient;
