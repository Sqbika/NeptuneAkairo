const { Command } = require('discord-akairo');
const abc = 'abcdefghijklmnopqrstuvwxyz'.split('');

module.exports = class Base64Command extends Command {
	constructor() {
		super('base64', {
			aliases: ['base64', 'b64'],
			usage: 'base64 <text:Rest>',
            description: 'Rotates the text according to the number',
            typing: true,
            args: [ {
                id: 'text',
                match: 'rest',
                description: {
                    description: "The text you want to encode/decode",
                    usage: "<text:Rest>"
                }
            }]
        });
	}

	async exec(msg, { text }) {
        text.startsWith('-') ? msg.reply("Decoded Text: " + Buffer.from(text.replace('-', ''), 'base64').toString('ascii')) : msg.reply("Encoded Text: " + Buffer.from(text.replace('-', '')).toString('base64'));
	}
};