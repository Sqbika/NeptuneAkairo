const { Command } = require('discord-akairo');

module.exports = class ArglistCommand extends Command {
	constructor() {
		super('arglist', {
			aliases: ['arglist'],
			usage: 'arglist',
			description: 'Lists the ARGs.',
			channelRestriction: 'guild',
			ratelimit: 10000
		});
	}

	exec(msg) {
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		var result = '**List of ARGs**\nActive ARGs:\n```\n';
		if(Object.keys(argObject).length !== 0) {
			Object.keys(argObject).forEach((elem) => {
				if(argObject[elem].details.active == true) {
					result += `[${elem}] - ${argObject[elem].details.description}\nWiki: ${argObject[elem].details.wiki}\n`;
				}
			});
			result += '```\nHiatus ARGs\n```\n ';
			Object.keys(argObject).forEach((elem) => {
				if(argObject[elem].details.active !== true && argObject[elem].details.active !== false) {
					result += `[${elem}] - Status: ${argObject[elem].details.active} | Wiki: ${argObject[elem].details.wiki}\n`;
				}
			});
			result += '```\nInactive ARGs\n```\n ';
			Object.keys(argObject).forEach((elem) => {
				if(argObject[elem].details.active == false) {
					result += `[${elem}] - Wiki: ${argObject[elem].details.wiki}\n`;
				}
			});
		} else { result += 'None.'; }
		result += '```';
		msg.reply(result, { split: { prepend: '```', append: '```' } });
	}
};
