const { Listener } = require('discord-akairo');

module.exports = class MessageToDBListener extends Listener {
	constructor() {
		super('message', {
			emitter: 'client',
			eventName: 'message',
			category: 'Database'
		});
	}

	exec(msg) {
		if(!msg.author.bot && !msg.client.helper.scontains(msg.client.config.dbexclude, msg.channel.id) && msg.guild !== null && msg.content.length < 255) {
			msg.client.database.DBMSG.sync().then(() => {
				msg.client.database.DBMSG.create({
					Time: msg.createdTimestamp,
					Author: msg.author.id,
					Content: msg.client.database.helper.cleanContent(msg.content, msg.guild),
					Channel: msg.channel.id,
					Server: msg.guild.id
				});
			});
		}
	}
};
