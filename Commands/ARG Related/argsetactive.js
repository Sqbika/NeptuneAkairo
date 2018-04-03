const { Command } = require('discord-akairo');

module.exports = class ArgSetActivityCommand extends Command {
	constructor() {
		super('argsetactive', {
			aliases: ['argsetactive', 'asa'],
			usage: 'asa <ARG> <Active: true/false/text>',
			description: 'Sets an ARGs Active.',
			channelRestriction: 'guild',
			args: [
				{
					id: 'arg',
					type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
					prompt: {
						retries: 2,
						start: (msg) => '<@!' + msg.author.id + '> Please provide of the ARG.',
						retry: (msg) => '<@!' + msg.author.id + `> Please provide **ONLY** an existing ARG. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					},
					description: 'An ARG Name, which is in the database.',
					usage: '<string>'
				}, {
					id: 'active',
					prompt: {
						retries: 2,
						start: (msg) => '<@!' + msg.author.id + '> Please provide the text you want to set the Active to be.',
						retry: (msg) => '<@!' + msg.author.id + '> Please provide **ONLY** the text you want to set the Active to be.'
					},
					description: 'A string whether the ARG is active, inactive or hiatus.',
					usage: '<active, true, yes / inactive, false, no / string>'
				}
			]
		});
	}

	userPermissions(msg) {
		return msg.client.Permissions.ARGPermission(msg);
	}
	exec(msg, { arg, active }) {
		if(msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		switch(active.toLowerCase()) {
			case 'active':
			case 'true':
			case 'yes':
			case true:
				active = true;
				break;
			case 'inactive':
			case 'false':
			case 'no':
			case false:
				active = false;
				break;
		}
		argObject[arg].details.active = active;
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('Successfully set the Active for the ARG.').then((me) => me.delete(10000));
	}
};
