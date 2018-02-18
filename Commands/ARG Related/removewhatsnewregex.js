const { Command } = require('discord-akairo');

module.exports = class RemoveWhatsNewRegexCommand extends Command {
	constructor() {
		super('removewhatsnewregex', {
			aliases: ['removewhatsnewregex', 'removewnr'],
			usage: 'removewr <ARG> <Number>',
			description: 'Remove a regex from the whatsnew list. Use listwnr before using!',
			channelRestriction: 'guild',
			args: [
				{
					id: 'arg',
					type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1,
					prompt: {
						retries: 2,
						start: 'Please provide a name for the ARG to set the regex for.',
						retry: (msg) => `Please provide an existing ARG to set the regex for. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					}
				}, {
					id: 'text',
                    match: 'rest',
                    type: 'number',
					prompt: {
						retries: 2,
						start: 'Please provide the number of the regex you want to remove.',
						retry: 'Please provide the number of the regex you want to remove.'
					}
				}
			]
		});
	}

	userPermissions(msg) {
		return msg.client.settings.get(msg.guild.id, 'settings').admins.indexOf(msg.author.id) !== -1;
	}

	exec(msg, { arg, text }) {
		if(msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		argObject[arg].leavemealone.regexList.splice(text, 1);
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('Successfully removed the regex for the ARG.').then((me) => me.delete(10000));
	}
};
