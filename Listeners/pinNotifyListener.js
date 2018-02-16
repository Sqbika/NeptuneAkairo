const { Listener } = require('discord-akairo');

module.exports = class pinNotifyListener extends Listener {
	constructor() {
		super('channelPinsUpdate', {
			emitter: 'client',
			eventName: 'channelPinsUpdate',
			category: 'Notify'
		});
    }

    async exec(channel) {
        this.client.notify.checkPinNotify(channel);
    }
    
}