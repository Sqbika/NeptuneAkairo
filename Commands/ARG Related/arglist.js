const { Command } = require('discord-akairo');

module.exports = class ArglistCommand extends Command {
	constructor() {
		super('arglist', {
            description: 'Lists the ARGs.',
            channelRestriction: 'guild',
            ratelimit: 10000
		});
	}

	exec(msg) {
        var argObject = msg.guild.settings.get(msg.guild.id, "args");
        var result = '**List of ARGs**\nActive ARGs:\n\`\`\`\n';
        argObject.forEach((elem) => {
            if (argObject[elem]["details"]["active"] == true) {
                result += "[" + elem + "] - " + argObject[elem]["details"]["description"] + "\nWiki: " + argObject[elem]["details"]["wiki"] + "\n";
            }
        });
        result += "\`\`\`\nHiatus ARGs\n\`\`\`\n";
        argObject.forEach((elem) => {
            if (argObject[elem]["details"]["active"] !== true && argObject[elem]["details"]["active"] !== false) {
                result += "[" + elem + "] - " + argObject[elem]["details"]["description"] + "\nWiki: " + argObject[elem]["details"]["wiki"] + "\n";
            }
        });
        result += "\`\`\`\nInactive ARGs\n\`\`\`\n";
        argObject.forEach((elem) => {
            if (argObject[elem]["details"]["active"] == false) {
                result += "[" + elem + "] - " + argObject[elem]["details"]["description"] + "\nWiki: " + argObject[elem]["details"]["wiki"] + "\n";
            }
        });
        result += "\`\`\`";
        msg.reply(result, {split: {prepend: '\`\`\`', append: '\`\`\`'}});
	}
};
