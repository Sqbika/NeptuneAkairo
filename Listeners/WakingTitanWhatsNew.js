const { Listener } = require('discord-akairo');

module.exports = class WakingTitan extends Listener {
	constructor() {
		super('message', {
			emitter: 'client',
			eventName: 'message',
			category: 'WakingTitan'
		});
	}

	exec({ ID, msg }) {
		if(msg.client.sqbika.wt.whatsnewChannels.indexOf(msg.channel.id) !== -1) {
			var whitelist = msg.client.sqbika.wt.whitelist.whitelist;
			var result = false;
			for(var i = 0; i < regexes.length; i++) {
				if(!result) {
					result = regexes[i].test(msg.content);
				}
			}
			if(result && whitelist.indexOf(msg.author.id) === -1) {
				msg.author.send(text(msg));
			}
		}
	}
};

var regexes = [
	new RegExp(/(?=.*anything)(?=.*new).*/i),
	new RegExp(/(?=.*anything)(?=.*yet).*/i),
	new RegExp(/(?=.*nothing)(?=.*new).*/i),
	new RegExp(/(?=.*whats)(?=.*new).*/i),
	new RegExp(/(?=.*something)(?=.*new).*/i),
	new RegExp(/(?=.*anything)(?=.*happen).*/i),
	new RegExp(/(?=.*yet)(?=.*happened).*/i),
	new RegExp(/(?=.*anything)(?=.*happened).*/i),
	new RegExp(/(?=.*last)(?=.*night)(?=.*what).*/i),
	new RegExp(/(?=.*last)(?=.*night)(?=.*anything).*/i),
	new RegExp(/(?=.*last)(?=.*night)(?=.*something).*/i),
	new RegExp(/(?=.*happened)(?=.*new).*/i),
	new RegExp(/(?=.*anything)(?=.*happened).*/i),
	new RegExp(/(?=.*updates)(?=.*any).*/i),
	new RegExp(/(?=.*still)(?=.*wait).*/i),
	new RegExp(/(?=.*we)(?=.*waiting)(?=.*are).*/i),
	new RegExp(/(?=.*something)(?=.*happened).*/i),
	new RegExp(/(?=.*news)(?=.*any).*/i)
];

var text = (msg) => `
**Greetings**
You have said \`${msg.content}\` in a waking titan channel.
Please refer to these options instead of asking:
- The Pins: Most encouraged to do, as it's the most up-to-date
- The Wiki: <http://wiki.gamedetectives.net/index.php?title=Waking_Titan>
- \`nep whatsnew\`: Sends you here the lastest part in the wiki

To acknowledge these instructions, type \`nep leavemealone\` in <#160894083173318666> , which makes me  ignore your whats mew type of messages.

Thank you for understanding and have a quick catchup ;)
`;
