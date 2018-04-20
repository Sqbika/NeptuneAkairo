const {
	Command
} = require('discord-akairo');

module.exports = class RemoveModsCommand extends Command {
	constructor() {
		super('removemods', {
			aliases: ['removemods'],
			usage: 'removemods <role>',
			description: 'Removes a role from the mods list.',
			channelRestriction: 'guild',
			args: [{
				id: 'role',
				type: 'role',
				prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please provide the role you want to remove from the list.`
				}
			}]
		});
	}

	userPermissions(msg) {
		return msg.client.settings.get(msg.guild.id, 'settings', []).admins.indexOf(msg.author.id) !== -1;
	}

	exec(msg, {
		role
	}) {
		if (msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'settings');
		argObject.mods.splice(argObject.mods.indexOf(role.id), 1);
		msg.client.settings.set(msg.guild.id, 'settings', argObject);
		msg.reply('Succesfully removed role from the mods list.').then((me) => me.delete(10000));
	}
};