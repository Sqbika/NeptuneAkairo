const { Command } = require('discord-akairo');
var letters = require('../../JSONS/letters.json');

module.exports = class BigtextCommand extends Command {
	constructor() {
		super('bigtext', {
			typing: true,
			cooldown: 10000,
			description: {
				content: 'Creates emoji bigtext from string.',
				usage: '<text>',
				examples: ['text']
			},
			args: [
				{
					id: 'message',
					match: 'content'
				}
			]
		});
	}

	exec(msg, { message }) {
		var result = [
			'',
			'',
			'',
			'',
			''
		];
		for(var i = 0; i < message.length; i++) {
			var letter = message[i];
			if(letters[letter.toLowerCase()] === undefined) {
				for(var j = 0; j < 5; j++) { result[j] += ':sp:'; }
			} else {
				for(var j = 0; j < 5; j++) {
					letters[letter.toLowerCase()][j].forEach((e) => result[j] += e);
				}
			}
			for(var j = 0; j < 5; j++) { result[j] += ':sp:'; }
		}
		for(var j = 0; j < 5; j++) {
			result[j] = result[j].replace(new RegExp('EM', 'g'), ':white_large_square:').replace(new RegExp(':sp:', 'g'), ':black_large_square:');
		}
		result.forEach((e) => msg.channel.send(e));
	}
};
