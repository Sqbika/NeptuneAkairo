const { Listener } = require('discord-akairo');

module.exports = class CommandHandlerCommandStartedListener extends Listener {
	constructor() {
		super('commandStarted', {
			emitter: 'commandHandler',
			eventName: 'commandStarted',
			category: 'Commands'
		});
	}

	exec(msg, command) {
        msg.client.channels.get(msg.client.config.channels.log).send(`-----------------------------------
[CMD] - Issued Command: ${command.id}
     Issued by: \`${msg.author.username}#${msg.author.discriminator} / ${msg.author.id}\`
     On: \`${msg.guild === null ? msg.channel.recipient : msg.guild.name}/${msg.channel.name}\`
           
    At: ${new Date()}
-----------------------------------`);
	}
};
