const { Listener } = require('discord-akairo');

module.exports = class WhatsNewListener extends Listener {
	constructor() {
		super('whatsnewListener', {
			emitter: 'client',
			eventName: 'message',
			category: 'ARG Related'
		});
	}

	async exec(msg) {
		if(msg.guild) {
			var argObject = msg.client.settings.get(msg.guild.id, 'args', []);
			Object.keys(argObject).forEach((ele) => {
				if(argObject[ele].channels.indexOf(msg.channel.id) !== -1) {
					argObject[ele].leavemealone.regexList.forEach((ele2) => {
						if(new RegExp(ele2, 'i').test(msg.content) && argObject[ele].leavemealone.blacklist.indexOf(msg.author.id) == -1)						{
							msg.author.send(argObject[ele].leavemealone.text);
						}
					});
				}
			});
		}
	}
};
