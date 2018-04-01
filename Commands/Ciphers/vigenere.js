const { Command } = require('discord-akairo');
const abc = 'abcdefghijklmnopqrstuvwxyz'.split('');

module.exports = class VigenereCommand extends Command {
	constructor() {
		super('vigenere', {
			aliases: ['vig', 'vigenere'],
			usage: 'vig <text:Word> <text:Rest>',
            description: 'Rotates the text according to the Word',
            typing: true,
            args: [{
                id: 'word',
                match: 'word',
            }, {
                id: 'text',
                match: 'rest'
            }]
        });
	}

	async exec(msg, { word, text }) {
        word = word.split('');
        var textarr = text.split('');
        var result = "";
        for (var i = 0; i < text.length; i++) {
            if (abc.indexOf(textarr[i].toLowerCase()) !== -1) {
                if (textarr[i].toLowerCase() !== textarr[i]) {
                    result += abc[abc.indexOf(textarr[i].toLowerCase()) + 1 + abc.indexOf(word[i % word.length].toLowerCase())].toUpperCase();
                } else {
                    result += abc[abc.indexOf(textarr[i]) + abc.indexOf(word[i % word.length].toLowerCase())];
                }
            } else {
                result += textarr[i];
            }
        }
        msg.reply("Vigenere Ciphered Text with `" + word + "`: **" + result + "**");
	}
};