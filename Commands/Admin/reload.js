const { Command } = require('discord-akairo');

module.exports = class ReloadCommand extends Command {
	constructor() {
		super('reload', {
			aliases: ['reload', 'r'],
			description: 'Reloads a command.',
			ownerOnly: true,
			protected: true,
			args: [
				{ id: 'module' }
			]
		});
	}

	exec(msg, { module }) {
		const types = ['commandAlias', 'inhibitor', 'listener'];
		var command;
		for(var i = 0; i < types.length; i++) {
			var resolver = this.client.commandHandler.resolver.type(types[i]);
			command = resolver(module);
			if(command) {
				i = 5;
			}
		}
		if(command) {
			command.reload();
			msg.reply(`Successfully reloaded \`${command.id}\``);
		} else {
			msg.reply(`No Command/Inhibitor/Listener found with \`${module}\``);
		}
	}
};
