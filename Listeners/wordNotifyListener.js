const { Listener } = require('discord-akairo');

module.exports = class NotifyListener extends Listener {
	constructor() {
		super('notifyListener', {
			emitter: 'client',
			eventName: 'message',
			category: 'ARG Related'
		});
	}

	async exec(msg) {
		if(msg.guild)	{
			msg.client.notify.checkWordNotify(msg);
		}
	}
};
