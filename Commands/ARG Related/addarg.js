const { Command } = require('discord-akairo');

module.exports = class AddArgCommand extends Command {
	constructor() {
		super('addarg', {
			aliases: ['addarg'],
			description: 'Adds an ARG to the database. The channel defaults to the channel it was created in.',
			usage: 'addarg <argName>',
			channelRestriction: 'guild',
			args: [
				{
					id: 'argName',
					type: (word, msg) => (Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) == -1) ? true : undefined,
					prompt: {
						retries: 2,
						start: (msg) => '<@!' + msg.author.id + '> Please provide a name for the ARG for the users to use. It cannot be the same as an existing one.',
						retry: (msg) => '<@!' + msg.author.id + `> Please provide **ONLY** a non-existant name in the database for the ARG. Names in the database: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					},
					description: 'A name for the ARG',
					usage: '<string>'
				}
			]
		});
	}

	userPermissions(msg) {
		return msg.client.Permissions.ARGPermission(msg);
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
				users: []
			},
			channel: msg.channel.id,
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
