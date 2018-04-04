const {
	Command
} = require('discord-akairo');

module.exports = class PinMessageCommand extends Command {
	constructor() {
		super('pinmessage', {
			aliases: ['pinmessage', 'pim'],
			usage: 'pim <sub> <arg> <text>',
			description: 'Sets an ARGs channel.',
			channelRestriction: 'guild',
			args: [{
                id: 'sub',
                type: [['waitingfor', 'wf', 'waiting', 'wfor'], ['whathappened', 'wh', 'happened', 'happen']],
                prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please choose which one you want to update: **waitingfor** or **whathappened**`,
					retry: (msg) => `<@!${msg.author.id}> Please choose either **waitingfor** or **whathappened**`
				},
                description: 'The sub between updating waitingfor and whathappened',
                usage: '<waitingfor,wf,waiting,wfor> or <whathappened,wh,happened,happen>'
            },{
				id: 'arg',
				type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
				prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please provide a name for the ARG to set the main channel.`,
					retry: (msg) => `<@!${msg.author.id}${`> Please provide **ONLY** an existing ARG to set the main channel. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``}`
				},
				description: 'An ARG Name, which is in the database.',
				usage: '<string>'
			}, {
                id: 'text',
                match: 'rest',
                prompt: {
                    start: (msg) => `<@!${msg.author.id}> Please provide the text you want to update the pin with.`
                },
                description: 'The text that will update the pinMessage.',
				usage: '<string:rest>'
            }]
		});
	}

	userPermissions(msg) {
		return msg.client.Permissions.ARGPermission(msg);
	}

    async exec(msg, { sub, arg, text }) {
        var arg = client.settings.get(msg.guild.id, 'args')[arg];
        var pinMessage = arg[pinMessage];
        if (typeof pinMessage == "undefined") {
            pinMessage = {
                id: 0,
                arg: arg,
                msgID: 0,
                channel: arg.channel,
                whatHappened: {
                    text: "Nothing.",
                    date: new Date()
                },
                waitingFor: {
                    text: "Nothing.",
                    date: new Date()
                }
            }
        }
        if (sub == "waitingfor") {
            pinMessage.waitingFor.text = text;
            pinMessage.waitingFor.date = new Date();
        }
        if (sub == "whathappened") {
            pinMessage.whatHappened.text = text;
            pinMessage.waitingFor.date = new Date();
        }
        client.pinMessage.addMessage(pinMessage);
        msg.reply("Added and updated PinMessage. Will show up in a few seconds.").then(res => res.delete(5000));
	}
};