const { Command } = require('discord-akairo');

module.exports = class AddModsCommand extends Command {
	constructor() {
		super('addmods', {
			aliases: ['addmods'],
			usage: 'addmods <role>',
			description: 'Adds a role to the moderator list.',
			channelRestriction: 'guild',
			args: [
				{
					id: 'role',
					type: 'role',
					prompt: {
						retries: 2,
						start: 'Please provide the role you want to add to the list.'
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
        if (!argObject.mods) argObject.mods = [];
		argObject.mods.push(user.id);
		msg.client.settings.set(msg.guild.id, 'settings', argObject);
		msg.reply('Succesfully added role to the mods list.').then((me) => me.delete(10000));
	}
};
