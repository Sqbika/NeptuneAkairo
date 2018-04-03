const { Listener } = require('discord-akairo');

module.exports = class pinNotifyListener extends Listener {
	constructor() {
		super('pinNotifyListener', {
			emitter: 'client',
			eventName: 'channelPinsUpdate',
			category: 'Notify'
		});
	}

	async exec(channel, date) {
		var pins = await channel.fetchPinnedMessages();
		if (pins.first().createdAt < date && pins.size > this.client.pinNumbers[channel.id]) {
			this.client.notify.checkPinNotify(channel);
		}
		this.client.pinNumbers[channel.id] = pins.size;
	}

}
;
