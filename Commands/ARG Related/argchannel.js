const { Command } = require('discord-akairo');

module.exports = class ArgChannelCommand extends Command {
	constructor() {
		super('argchannel', {
			aliases: ['argchannel'],
			usage: 'argchannel <ARG> <add/remove> <channel>',
			description: 'Adds the channel for the ARG List',
			channelRestriction: 'guild',
			args: [
				{
					id: 'arg',
					type: (word, msg) => (Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1) ? true : undefined,
					prompt: {
						retries: 2,
						start: 'Please provide a name for the ARG to set the main channel.',
						retry: (msg) => `Please provide an existing ARG to set the main channel. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					},
					description: 'An ARG Name, which is in the database.',
					usage: '<string>'
				}, {
					id: 'type',
					type: ['add', 'remove'],
					prompt: {
						retries: 2,
						start: 'Do you want to **add** or **remove** a channel?',
						retry: 'You need to choose either **add** or **remove**'
					},
					description: 'You can **add** or **remove**',
					usage: '<add / remove>'
				}, {
					id: 'channel',
					type: 'channel',
					prompt: {
						retries: 2,
						start: 'Please provide a channel to set the ARGs main channel',
						retry: 'Please provide a channel to set the ARGs main channel'
					},
					description: 'Add an ARG channel to watch for the whats new messages.',
					usage: '<channel>'
				}
			]
		});
	}

	userPermissions(msg) {
		return msg.client.settings.get(msg.guild.id, 'settings', []).admins.indexOf(msg.author.id) !== -1;
	}

	exec(msg, { arg, type, channel }) {
		if(msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		if(type == 'add') {
			argObject[arg].channels.push(channel.id);
		} else {
			argObject[arg].channels.splice(argObject[arg].channels.indexOf(channel.id), 1);
		}
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply(`Successfully **${type}ed** channel.`).then((me) => me.delete(10000));
	}
};
