const { Command } = require('discord-akairo');

module.exports = class LeavemealoneCommand extends Command {
	constructor() {
		super('leavemealone', {
			aliases: ['leavemealone', 'lma'],
			usage: 'lma <ARG>',
			description: 'Adds to you the leavemealone list of an arg.',
			channelRestriction: 'guild',
			args: [
				{
					id: 'arg',
					type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
					prompt: {
						retries: 2,
						start: 'Please provide a name for the ARG to set the main channel.',
						retry: (msg) => `Please provide an existing ARG to set the main channel. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					}
				}
			]
		});
	}

	exec(msg, { arg }) {
		if(msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var argObject = msg.client.settings.get(msg.guild.id, 'args');
		argObject[arg].leavemealone.blacklist.push(msg.author.id);
		msg.client.settings.set(msg.guild.id, 'args', argObject);
		msg.reply('Successfully added you to the blacklist.').then((me) => me.delete(10000));
	}
};
