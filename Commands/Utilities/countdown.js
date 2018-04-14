const { Command } = require('discord-akairo');

module.exports = class CountdownCommand extends Command {
	constructor() {
		super('countdown', {
			aliases: ['countdown', 'cd'],
			usage: 'ping',
			description: 'Pong!'
		});
	}

	async exec(msg) {
	}
};
