const { Command } = require('discord-akairo');

module.exports = class RebootCommand extends Command {
	constructor() {
		super('reboot', {
			aliases: ['reboot'],
			description: 'Reboots the bot.',
			ownerOnly: true,
			protected: true
		});
	}

	exec(msg) {
		msg.reply('Rebooting.').then(() => {
			console.log(`Rebooting at ${new Date()}`);
			process.exit(0);
		});
	}
};
