const { Command } = require('discord-akairo');

module.exports = class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help'],
			description: 'Lists all the commands'
		});
	}

	exec(msg) {
		var result = msg.client.util.embed()
            .setTitle(`Avaliable commands in ${msg.guild}` ? msg.guild.name : msg.author.username)
            .setColor(msg.client.config.color)
            .setAuthor(msg.client.user)
            .setTimestamp(Date.now());
		this.handler.categories.values().forEach((cat) => {
			result.addField(cat.id, cat.map(com => `**${com.aliases[0]}** | ${com.description}`).join('\n'));
		});
		msg.reply({ embed: result });
	}
};
