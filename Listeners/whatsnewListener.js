const {
	Listener
} = require('discord-akairo');

module.exports = class WhatsNewListener extends Listener {
	constructor() {
		super('whatsnewListener', {
			emitter: 'client',
			eventName: 'message',
			category: 'ARG Related'
		});
	}

	async exec(msg) {
		var argObject = msg.client.settings.get(msg.guild.id, "args");
		Object.keys(argObject).forEach((ele) =>{
			if (argObject[ele]["whatsnew"][channels].indexOf(msg.channel.id) !== -1) {
				argObject[ele]["whatsnew"]["regexList"].forEach((ele) => {
					if (ele.test(msg.content) && argObject[ele]["whatsnew"]["blacklist"].indexOf(msg.author.id) !== -1)
						msg.author.send(argObject[ele]["whatsnew"]["text"]);
				})
			}
		});
	}
};