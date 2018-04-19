const { Command } = require('discord-akairo');
const abc = 'abcdefghijklmnopqrstuvwxyz'.split('');

module.exports = class NumToLetCommand extends Command {
	constructor() {
		super('numtolet', {
			aliases: ['numtolet', 'lettonum', 'ntl', 'ltn'],
			usage: 'ntl <text:Rest>',
            description: 'Translates the text according to the number. Decode is - (Number -> Letter), Encode is without - (Letter -> Number)',
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
        text.startsWith('-') ? msg.reply("Decoded Text: " + text.replace('-', '').split(' ').map((e) => abc[Number(e)-1]).join('')) : msg.reply("Encoded Text: " + text.replace('-', '').split('').map((e) => abc.indexOf(e)).join(' '));
	}
};