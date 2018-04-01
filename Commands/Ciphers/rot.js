const { Command } = require('discord-akairo');
const abc = 'abcdefghijklmnopqrstuvwxyz'.split('');

module.exports = class RotCommand extends Command {
	constructor() {
		super('rot', {
			aliases: ['rot'],
			usage: 'rot <number:1-27> <text:Rest>',
            description: 'Rotates the text according to the number',
            typing: true,
            args: [{
                id: 'number',
                type: 'integer',
            }, {
                id: 'text',
                match: 'rest'
            }]
        });
	}

	async exec(msg, { rot, text }) {
        var textarr = text.split('');
        var result = "";
        for (var i = 0; i < text.length; i++) {
            if (abc.indexOf(textarr[i]) !== -1) {
                if (textarr[i].toLowerCase() !== textarr[i]) {
                    result += abc[abc.indexOf(textarr[i].toLowerCase()) + number].toUpperCase();
                } else {
                    result += abc[abc.indexOf(textarr[i]) + number];
                }
            } else {
                result += textarr[i];
            }
        }
        msg.reply("Rotated Text with `" + number + "`: **" + result + "**");
	}
};
