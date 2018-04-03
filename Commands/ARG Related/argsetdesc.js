const {
	Command
} = require('discord-akairo');

module.exports = class ArgSetDescriptionCommand extends Command {
	constructor() {
		super('argsetdesc', {
			aliases: ['argsetdesc', 'asd'],
			usage: 'asd <ARG> <text>',
			description: 'Sets an ARGs Description.',
			channelRestriction: 'guild',
			args: [{
				id: 'arg',
				type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
				prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please provide of the ARG.`,
					retry: (msg) => `<@!${msg.author.id}${`> Please provide **ONLY** an existing ARG. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``}`
				},
				description: 'An ARG Name, which is in the database.',
				usage: '<string>'
			}, {
				id: 'text',
				match: 'rest',
				prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}>Please provide the text you want to set the Description to be.`,
					retry: (msg) => `<@!${msg.author.id}>Please provide **ONLY** the text you want to set the Description to be.`
				},
				description: 'An ARGs description text',
				usage: '<string (infinite)'
			}]
		});
	}

	userPermissions(msg) {
		return msg.client.Permissions.ARGPermission(msg);
	}

	exec(msg, {
		arg,
		text
	}) {
		if (msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		argObject[arg].details.description = text;
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('Successfully set the Description for the ARG.').then((me) => me.delete(10000));
	}
};