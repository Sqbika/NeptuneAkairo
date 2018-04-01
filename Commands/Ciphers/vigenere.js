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
        var decode = word.startsWith('-') ? true : false; 
        word = word.replace('-', '').split('');
        var textarr = text.split('');
        var result = "";
        for (var i = 0; i < text.length; i++) {
            if (abc.indexOf(textarr[i].toLowerCase()) !== -1) {
                if (textarr[i].toLowerCase() !== textarr[i]) {
                    result += decode ? abc[wrap(abc.indexOf(textarr[i].toLowerCase()) - abc.indexOf(word[i % word.length]), abc.length) % abc.length].toUpperCase() :
                                       abc[(abc.indexOf(textarr[i].toLowerCase()) + abc.indexOf(word[i % word.length])) % abc.length].toUpperCase();
                } else {
                    console.log(abc.indexOf(word[i % word.length]));
                    result += decode ? abc[wrap(abc.indexOf(textarr[i]) - abc.indexOf(word[i % word.length]), abc.length) % abc.length] :
                                       abc[(abc.indexOf(textarr[i]) + abc.indexOf(word[i % word.length])) % abc.length];
                }
            } else {
                result += textarr[i];
            }
        }
        msg.reply("Vigenere Ciphered Text with `" + word.join('') + "`: **" + result + "**");
	}
};

function wrap (what, num) {
    do {
        what + num;
    } while (what < 0 );
}