const { Command } = require('discord-akairo');

module.exports = class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			usage: 'ping',
			description: 'Pong!'
		});
	}

	async exec(msg) {
		msg.channel.send('Pong!').then(mes => {
			var diff = (mes.editedAt || mes.createdAt) - (msg.editedAt || msg.createdAt);
			mes.edit(`Pong! :ping_pong:
**Took**: ${diff} ms
**Heartbeat**: ${Math.round(msg.client.ping)} ms`);
		});
	}
};
