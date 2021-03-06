const {
	Command
} = require('discord-akairo');

module.exports = class ArgSetChannelCommand extends Command {
	constructor() {
		super('argsetchannel', {
			aliases: ['argsetchannel', 'asc'],
			usage: 'asc <ARG> <channel>',
			description: 'Sets an ARGs channel.',
			channelRestriction: 'guild',
			args: [{
				id: 'arg',
				type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
				prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please provide a name for the ARG to set the main channel.`,
					retry: (msg) => `<@!${msg.author.id}${`> Please provide **ONLY** an existing ARG to set the main channel. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``}`
				},
				description: 'An ARG Name, which is in the database.',
				usage: '<string>'
			}, {
				id: 'channel',
				type: 'channel',
				prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please provide a channel to set the ARGs main channel`,
					retry: (msg) => `<@!${msg.author.id}> Please provide **ONLY** a channel to set the ARGs main channel`
				},
				description: 'Sets an ARGs main channel',
				usage: '<channel>'
			}]
		});
	}

	userPermissions(msg) {
		return msg.client.Permissions.ARGPermission(msg);
	}

	exec(msg, {
		arg,
		channel
	}) {
		if (msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		argObject[arg].channel = channel.id;
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('Successfully set the channel for the ARG.').then((me) => me.delete(10000));
	}
};