const { Listener } = require('discord-akairo');

module.exports = class CommandHandlerCommandBlockedListener extends Listener {
	constructor() {
		super('commandError', {
			emitter: 'commandHandler',
			eventName: 'commandError',
			category: 'Commands'
		});
	}

	exec(error, msg, command) {
		try {
			msg.client.channels.get(msg.client.config.channels.error).send(`-----------------------------------
        [ERROR] - Command: ${command.id} throwed error.
         Issed by: \`${msg.author.username}#${msg.author.discriminator} / ${msg.author.id}\`
        On: \`${msg.guild === null ? msg.channel.recipient : msg.guild.name}/${msg.channel.name}\`
        
        At: ${new Date()}
        -----------------------------------`);
		} catch(Ee) {
			msg.client.channels.get(msg.client.config.channels.error).send(`-----------------------------------
        [ERROR] - Command: ${command.id} throwed error.
         At: ${new Date()}
        -----------------------------------`);
		}
	}
};

