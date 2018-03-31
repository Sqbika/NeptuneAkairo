const { Command } = require('discord-akairo');

module.exports = class RenameArgCommand extends Command {
	constructor() {
		super('renamearg', {
			aliases: ['renamearg'],
			usage: 'renamearg <What:ARG> <To:text>',
			description: 'Renames an ARG to the database',
			channelRestriction: 'guild',
			args: [
				{
					id: 'what',
					type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
					prompt: {
						retries: 2,
						start: 'Please provide a name for the ARG to rename.',
						retry: (msg) => `Please provide an existing ARG to rename. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					},
					description: 'The ARG you want to rename.',
					usage: '<arg>'
				}, {
					id: 'toWhat',
					type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) == -1 ? true : undefined,
					prompt: {
						retries: 2,
						start: 'Please provide a name for the ARG for the users to use. It cannot be the same as an existing one.',
						retry: (msg) => `Please provide a non-existant name in the database for the ARG. Names in the database: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					},
					description: 'String for the ARG renamed to',
					usage: '<string>'
				}
			]
		});
	}

	userPermissions(msg) {
		return msg.client.settings.get(msg.guild.id, 'settings', []).admins.indexOf(msg.author.id) !== -1;
	}

	exec(msg, { what, toWhat }) {
		if(msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		argObject[toWhat] = argObject[what];
		delete argObject[what];
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('ARG Successfully renamed in the database.').then((me) => me.delete(10000));
	}
};
