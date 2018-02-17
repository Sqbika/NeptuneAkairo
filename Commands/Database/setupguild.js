const { Command } = require('discord-akairo');

module.exports = class SetupCommand extends Command {
	constructor() {
		super('setup', {
			aliases: ['setup'],
			description: 'Sets up the bot for the guild.',
			userPermission: ['MANAGE_GUILD']
		});
	}

	exec(msg) {
		if(msg.client.settings.get(msg.guild.id, 'settings', 'notFound') == 'notFound') {
			msg.client.settings.set(msg.guild.id, 'settings', {
				admins: [msg.author.id, msg.guild.ownerID],
				argDelete: true,
				leaveMeAlone: true
			});
			msg.client.settings.set(msg.guild.id, 'args', {});
			msg.client.settings.set(msg.guild.id, 'notify', []);
		}
	}
};
