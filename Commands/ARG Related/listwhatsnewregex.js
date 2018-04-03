const { Command } = require('discord-akairo');

module.exports = class ListWhatsNewRegexCommand extends Command {
	constructor() {
		super('listwhatsnewregex', {
			aliases: ['listwhatsnewregex', 'listwsnr'],
			usage: 'listwsnr <ARG>',
			description: 'List the ARGs regexes',
			channelRestriction: 'guild',
			args: [
				{
					id: 'arg',
					type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
					prompt: {
						retries: 2,
						start: (msg) => '<@!' + msg.author.id + '> Please provide a name for the ARG to set the regex for.',
						retry: (msg) => '<@!' + msg.author.id + `> Please provide **ONLY** an existing ARG to set the regex for. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					},
					description: 'An ARG Name, which is in the database.',
					usage: '<string>'
				}
			]
		});
	}

	userPermissions(msg) {
		return msg.client.Permissions.ARGPermission(msg);
	}

	exec(msg, { arg }) {
		if(msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		var regexes = msg.client.util.embed()
            .setColor(msg.client.config.color)
            .setTimestamp(new Date());
		var regexNumbers = '';
		for(var i = 0; i < argObject[arg].leavemealone.regexList.length; i++) {
			regexNumbers += `${i}: ${argObject[arg].leavemealone.regexList[i]}\n`;
		}
		regexes.addField(`Regexes of ${arg}`, regexNumbers === '' ? 'None.' : regexNumbers);
		msg.reply({ embed: regexes });
	}
};
