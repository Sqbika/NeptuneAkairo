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
                description: {
                    description: 'The vigenere word you want to encode/decode with.',
                    usage: '<-><word> (The - is a sign for decoding. `apple` encode / `-apple` decode'
                }
            }, {
                id: 'text',
                match: 'rest',
                description: {
                    description: "The text you want to encode/decode",
                    usage: "<text:Rest>"
                }
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
        what += num;
    } while (what < 0 );
    return what;
}