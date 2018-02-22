const { Command } = require('discord-akairo');

module.exports = class ArgSetDescriptionCommand extends Command {
	constructor() {
		super('argsetdesc', {
			aliases: ['argsetdesc', 'asd'],
			usage: 'asd <ARG> <text>',
			description: 'Sets an ARGs Description.',
			channelRestriction: 'guild',
			args: [
				{
					id: 'arg',
					type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
					prompt: {
						retries: 2,
						start: 'Please provide of the ARG.',
						retry: (msg) => `Please provide an existing ARG. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					}
				}, {
					id: 'text',
					match: 'rest',
					prompt: {
						retries: 2,
						start: 'Please provide the text you want to set the Description to be.',
						retry: 'Please provide the text you want to set the Description to be.'
					}
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
		argObject[arg].details.description = text;
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('Successfully set the Description for the ARG.').then((me) => me.delete(10000));
	}
};
