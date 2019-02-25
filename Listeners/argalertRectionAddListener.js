const { Listener } = require('discord-akairo');
const discordjs = require('discord.js');

module.exports = class ClientArgalertRectionAddListener extends Listener {
	constructor() {
		super('argalertRectionAdd', {
			emitter: 'client',
			eventName: 'messageReactionAdd',
			category: 'ARG Related'
		});
	}

	/**
	 * 
	 * @param {discordjs.MessageReaction} reaction 
	 * @param {discordjs.User} user 
	 */
	async exec(reaction , user) {
		/** @type {discordjs.Message} */
		var msg = reaction.message;
		if (msg.author.id !== msg.client.user.id || user.id == msg.client.user.id) return;
		if (msg.embeds.length == 1) {
			/** @type {discordjs.MessageEmbed} */
			var embed = msg.embeds[0];
			if (embed.footer != null && embed.footer.text.startsWith('ARGAlert')) {
				var arg = embed.footer.text.split('/')[1];
				var alertObject = msg.client.settings.get(msg.guild.id, 'args');
				if (alertObject[arg].argalert.users.indexOf(user.id) == -1) {
					alertObject[arg].argalert.users.push(user.id);
					msg.client.settings.set(msg.guild.id, 'args', alertObject);
					msg.reply("aaasd");
				}
				msg.reply("b");
			}
			msg.reply("c");
		}
	}
};
