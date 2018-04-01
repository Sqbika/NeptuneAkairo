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
