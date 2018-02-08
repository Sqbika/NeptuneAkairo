const { Command } = require('discord-akairo');

module.exports = class TalkCommand extends Command {
	constructor() {
		super('talk', {
			description: 'Database Query.',
			ownerOnly: true,
			args: [{
				id: 'qstring',
				match: 'content'
			}]
		});
	}

	async exec(msg, { qstring }) {
		var start = new Date();
		msg.channel.send(`\`\`\`js\nInput: ${qstring}\nOutput: [Calculating]\n\`\`\``)
            .then(message => {
	try {
		eval(qstring).then(res => {
			message.delete();
			msg.channel.send(`\`\`\`js\nInput: ${qstring}\nOutput: ${res}\n\n Ellapsed Time: ${new Date - start} ms\n\`\`\``);
		}).catch((err) => {
			if(err !== undefined) {
				message.delete();
    			msg.channel.send(`\`\`\`js\nInput: ${qstring}\nError: ${err}\n\n Ellapsed Time: ${new Date - start} ms\n\`\`\``);
			}
		});
	} catch(err) {
		message.delete();
		msg.channel.send(`\`\`\`js\nInput: ${qstring}\nError: ${err}\n\n Ellapsed Time: ${new Date - start} ms\n\`\`\``);
	}
});
	}
};
