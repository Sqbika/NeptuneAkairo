const {
	Command
} = require('discord-akairo');

module.exports = class RemoveWhatsNewRegexCommand extends Command {
	constructor() {
		super('removewhatsnewregex', {
			aliases: ['removewhatsnewregex', 'removewnr'],
			usage: 'removewr <ARG> <Number>',
			description: 'Remove a regex from the whatsnew list. Use listwnr before using!',
			channelRestriction: 'guild',
			args: [{
				id: 'arg',
				type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
				prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please provide a name for the ARG to set the regex for.`,
					retry: (msg) => `<@!${msg.author.id}${`> Please provide **ONLY** an existing ARG to set the regex for. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``}`
				},
				description: 'An ARG Name, which is in the database.',
				usage: '<string>'
			}, {
				id: 'text',
				match: 'rest',
				type: 'number',
				prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please provide the number of the regex you want to remove.`,
					retry: (msg) => `<@!${msg.author.id}> Please provide **ONLY** the number of the regex you want to remove.`
				},
				description: 'Remove a whatsnewregex from the ARG',
				usage: '<number>'
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
		argObject[arg].leavemealone.regexList.splice(text, 1);
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('Successfully removed the regex for the ARG.').then((me) => me.delete(10000));
	}
};