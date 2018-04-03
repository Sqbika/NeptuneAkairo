const {
	Command
} = require('discord-akairo');

module.exports = class AddAdminCommand extends Command {
	constructor() {
		super('addadmin', {
			aliases: ['addadmin'],
			usage: 'addadmin <member>',
			description: 'Adds a user to the admin list.',
			channelRestriction: 'guild',
			args: [{
				id: 'user',
				type: 'member',
				prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please provide the user you want to add to the list.`
				}
			}]
		});
	}

	userPermissions(msg) {
		return msg.client.settings.get(msg.guild.id, 'settings', []).admins.indexOf(msg.author.id) !== -1;
	}

	exec(msg, {
		user
	}) {
		if (msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'settings');
		argObject.admins.push(user.id);
		msg.client.settings.set(msg.guild.id, 'settings', argObject);
		msg.reply('Succesfully added admin to the admin list.').then((me) => me.delete(10000));
	}
};