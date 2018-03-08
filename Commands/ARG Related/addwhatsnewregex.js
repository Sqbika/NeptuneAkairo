const { Command } = require('discord-akairo');

module.exports = class AddWhatsNewRegexCommand extends Command {
	constructor() {
		super('addwhatsnewregex', {
			aliases: ['addwhatsnewregex', 'addwnr'],
			description: 'Add a new regex to the whatsnew list.',
			usage: 'addwnr <ARG> <text>',
			channelRestriction: 'guild',
			args: [
				{
					id: 'arg',
					type: (word, msg) => (Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1) ? true : undefined,
					prompt: {
						retries: 2,
						start: 'Please provide a name for the ARG to set the regex for.',
						retry: (msg) => `Please provide an existing ARG to set the regex for. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					},
					description: 'An ARG Name, which is in the database.',
					usage: '<string>'
				}, {
					id: 'text',
					match: 'rest',
					prompt: {
						retries: 2,
						start: 'Please provide the text you want to set the regex to be.',
						retry: 'Please provide the text you want to set the regex to be.'
					},
					description: 'A Regex which will be added to the list',
					usage: '<regex string>'
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
		argObject[arg].leavemealone.regexList.push(text);
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('Successfully added the regex for the ARG.').then((me) => me.delete(10000));
	}
};
