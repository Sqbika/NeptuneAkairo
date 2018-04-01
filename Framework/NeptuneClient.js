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
			ARGPermission: (msg) =>{
				var settings = msg.client.settings.get(msg.guild.id, 'settings', []);
				if (settings.admins.indexOf(msg.author.id) !== -1) return true;
				if (typeof settings.mods == "undefined") settings.mods = [];
				var result = msg.member.roles.filter((ele) => settings.mods.indexOf(ele.id) !== -1) > 0;
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
