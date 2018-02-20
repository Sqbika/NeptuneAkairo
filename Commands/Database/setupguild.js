const { Command } = require('discord-akairo');

module.exports = class SetupCommand extends Command {
	constructor() {
		super('setup', {
			aliases: ['setup'],
			description: 'Sets up the bot for the guild.',
			userPermission: ['MANAGE_GUILD']
		});
	}

	async exec(msg) {
		if(msg.client.settings.get(msg.guild.id, 'settings', 'notFound') == 'notFound') {
			await msg.client.settings.set(msg.guild.id, 'settings', {
				admins: [msg.author.id, msg.guild.ownerID],
				argDelete: true,
				leaveMeAlone: true
			});
			await msg.client.settings.set(msg.guild.id, 'args', {});
			await msg.client.settings.set(msg.guild.id, 'notify', []);
		}
	}
};
