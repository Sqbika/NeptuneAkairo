const { Command } = require('discord-akairo');

module.exports = class RemoveAdminCommand extends Command {
	constructor() {
		super('removeadmin', {
			aliases: ['removeadmin'],
			usage: 'removeadmin <member>',
			description: 'Removes a user to the admin list.',
			channelRestriction: 'guild',
			args: [
				{
					id: 'user',
					type: 'member',
					prompt: {
						retries: 2,
						start: (msg) => '<@!' + msg.author.id + '> Please provide the user you want to remove from the list.'
					}
				}
			]
		});
	}

	userPermissions(msg) {
		return msg.client.settings.get(msg.guild.id, 'settings', []).admins.indexOf(msg.author.id) !== -1;
	}

	exec(msg, { user }) {
		if(msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'settings');
		argObject.admins.splice(argObject.admin.indexOf(user.id), 1);
		msg.client.settings.set(msg.guild.id, 'settings', argObject);
		msg.reply('Succesfully remove admin from the admin list.').then((me) => me.delete(10000));
	}
};
