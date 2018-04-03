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
                description: {
                    description: 'The number you want to encode/decode with.',
                    usage: '<-><number> (The - is a sign for decoding. `5` encode / `-5` decode'
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

	async exec(msg, { number, text }) {
        var decode = number < 0 ? true : false;
        if (number < 0) number = number * -1;
        number = number % abc.length;
        var textarr = text.split('');
        var result = "";
        for (var i = 0; i < text.length; i++) {
            if (abc.indexOf(textarr[i].toLowerCase()) !== -1) {
                if (textarr[i].toLowerCase() !== textarr[i]) {
                    result += decode ? abc[wrap(abc.indexOf(textarr[i].toLowerCase()) - number, abc.length) % abc.length].toUpperCase() :
                                       abc[(abc.indexOf(textarr[i].toLowerCase()) + number) % abc.length].toUpperCase();
                } else {
                    result += decode ? abc[wrap(abc.indexOf(textarr[i]) - number, abc.length) % abc.length] :
                                       abc[(abc.indexOf(textarr[i]) + number) % abc.length];
                }
            } else {
                result += textarr[i];
            }
        }
        msg.reply("Rotated Text with `" + number + "`: **" + result + "**");
	}
};

function wrap (what, num) {
    do {
        what += num;
    } while (what < 0 );
    return what;
}
