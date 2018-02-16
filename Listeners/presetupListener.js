const { Listener } = require('discord-akairo');

module.exports = class PreSetupListener extends Listener {
	constructor() {
		super('preSetup', {
			emitter: 'commandHandler',
			eventName: 'commandStarted',
			category: 'Essentials'
		});
	}

	exec(msg, command) {
        if (msg.client.settings.get(msg.guild.id, "settings", "notFound") == "notFound" && command.options.category == "ARG Related") {
            if (msg.member.hasPermission('MANAGE_GULD')) {
                msg.reply("Please use \`" + msg.client.options.prefix + " setup \` before using ARG related commands.");
            }   else {
                msg.reply("Please notify higher ups to use \`" + msg.client.options.prefix + " setup \` before using ARG related commands.");   
            }
            
        }
	}
};
