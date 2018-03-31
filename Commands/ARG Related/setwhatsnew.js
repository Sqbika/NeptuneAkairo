const { Command } = require('discord-akairo');

module.exports = class ArgSetWhatsNewCommand extends Command {
	constructor() {
		super('setwhatsnew', {
			aliases: ['setwhatsnew', 'swn'],
			usage: 'swn <ARG> <text>',
			description: 'Sets an ARGs Whats New Message.',
			channelRestriction: 'guild',
			args: [
				{
					id: 'arg',
					type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
					prompt: {
						retries: 2,
						start: 'Please provide a name for the ARG to set the main channel.',
						retry: (msg) => `Please provide an existing ARG to set the main channel. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					},
					description: 'An ARG Name, which is in the database.',
					usage: '<string>'
				}, {
					id: 'text',
					match: 'rest',
					prompt: {
						retries: 2,
						start: 'Please provide the text you want to set the Whats New message to be.',
						retry: 'Please provide the text you want to set the Whats New message to be.'
					},
					description: 'The whatsnew message.',
					usage: '<string (infinite)'
				}
			]
		});
	}

	userPermissions(msg) {
		return msg.client.settings.get(msg.guild.id, 'settings', []).admins.indexOf(msg.author.id) !== -1;
	}

	exec(msg, { arg, text }) {
		if(msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		argObject[arg].leavemealone.text = text;
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('Successfully set the Whats New message for the ARG.').then((me) => me.delete(10000));
	}
};
