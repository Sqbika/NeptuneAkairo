const { Command } = require('discord-akairo');

module.exports = class AddArgCommand extends Command {
	constructor() {
		super('addarg', {
			aliases: ['addarg'],
			description: 'Adds an ARG to the database. The channel defaults to the channel it was created in.',
			channelRestriction: 'guild',
			args: [
				{
					id: 'argName',
					type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) == -1,
					prompt: {
						retries: 2,
						start: 'Please provide a name for the ARG for the users to use. It cannot be the same as an existing one.',
						retry: (msg) => `Please provide a non-existant name in the database for the ARG. Names in the database: \`${Object.keys(msg.client.options.get(msg.guild.id, 'args')).join(', ')}\``
					}
				}
			]
		});
	}

	userPermissions(msg) {
		return msg.client.settings.get(msg.guild.id, 'settings').admins.indexOf(msg.author.id) !== -1;
	}

	async exec(msg, { argName }) {
		if(msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		argObject[argName] = {
			leavemealone: {
				blacklist: [],
				regexList: [],
				text: ''
			},
			argalert: {
				channel: msg.channel.id,
				users: []
			},
			channels: [msg.channel.id],
			details: {
				description: '',
				wiki: '',
				active: true
			}
		};
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('ARG Successfully added to the database.').then((me) => me.delete(10000));
	}
};
