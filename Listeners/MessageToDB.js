const { Listener } = require('discord-akairo');

module.exports = class MessageToDBListener extends Listener {
	constructor() {
		super('message', {
			emitter: 'client',
			eventName: 'message',
			category: 'Database'
		});
	}

	exec({ ID, msg }) {
		if(!msg.author.bot && !msg.client.sqbika.helper.scontains(msg.client.sqbika.config.dbexclude, msg.channel.id) && msg.guild !== null && msg.content.length < 255) {
			msg.client.sqbika.DBMSG.sync().then(() => {
				msg.client.sqbika.DBMSG.create({
					Time: msg.createdTimestamp,
					Author: msg.author.id,
					Content: msg.client.sqbika.helper.cleanContent(msg.content, msg.guild),
					Channel: msg.channel.id,
					Server: msg.guild.id
				});
			});
		}
	}
};
