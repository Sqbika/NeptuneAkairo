const { Inhibitor } = require('discord-akairo');

module.exports = class PreSetupInhibitor extends Inhibitor {
	constructor() {
		super('preSetup', { reason: 'noArgSetup' });
	}

	async exec(msg, command) {
		if(msg.guild) {
			if(msg.client.settings.get(msg.guild.id, 'settings', 'notFound') == 'notFound' && command.category.id == 'ARG Related') {
				if(msg.member.hasPermission('MANAGE_GULD')) {
					msg.reply(`Please use \`${msg.client.options.prefix} setup \` before using ARG related commands.`);
					return true;
				} else {
					msg.reply(`Please notify higher ups to use \`${msg.client.options.prefix} setup \` before using ARG related commands.`);
					return true;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
};
