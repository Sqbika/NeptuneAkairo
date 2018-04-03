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
		if (this.client.pinNumber[channel.id] == undefined) {
			this.client.notify.checkFirstPinNotify(channel)
		}
		if (pins.size !== 0)
		if (pins.first().createdAt < date && pins.size > this.client.pinNumber[channel.id]) {
			if (pins.first().content.startsWith("!!!")) 
				this.client.notify.checkImportantPinNotify(channel);
			else 
				this.client.notify.checkPinNotify(channel);
		}
		this.client.pinNumber[channel.id] = pins.size;
	}

}
;
