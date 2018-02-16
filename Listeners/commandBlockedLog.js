const { Listener } = require('discord-akairo');

module.exports = class CommandHandlerCommandBlockedListener extends Listener {
	constructor() {
		super('commandBlocked', {
			emitter: 'commandHandler',
			eventName: 'commandBlocked',
			category: 'Commands'
		});
	}

	exec(msg, command, reason) {
        msg.channels.get(msg.client.sqbika.config.channels.blocked).send(`-----------------------------------
[BLOCK] - Command: ${command.id} was blocked.
    Issed by: \`${msg.author.username}#${msg.author.discriminator} / ${msg.author.id}\`
     On: \`${message.guild === null ? msg.channel.recipient : msg.guild.name}/${msg.channel.name}\`
     Reason:${reason}
            
    At: ${new Date()}
-----------------------------------`);
	}
};
