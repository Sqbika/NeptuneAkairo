const { Command } = require('discord-akairo');

module.exports = class TalkCommand extends Command {
	constructor() {
		super('talk', {
			aliases: ['talk'],
			description: 'Repeats the text.',
			ownerOnly: true,
			args: [
				{
					id: 'message',
					match: 'content'
				}
			]
		});
	}

	exec(msg, { message }) {
		msg.channel.send(message);
	}
};
