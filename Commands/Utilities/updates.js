const { Command } = require('discord-akairo');

module.exports = class UpdatesCommand extends Command {
	constructor() {
		super('updates', {
			aliases: ['updates'],
			usage: 'updates',
			description: 'Shows you the newest updates.'
		});
	}

	async exec(msg) {
        msg.channel.send({embed: msg.client.util.embed()
            .setTitle(`Newest Updates`)
            .setColor(msg.client.config.color)
            .setTimestamp(new Date())
            .addField("Details", `
+ Pin Notify: Three variants:
                -Starter -> Haven't indexed the channel
                -Normal -> A pin added (now doesn't notify about removing pins. (Hence the starter))
                -Important -> If a pin starts with \`!!!\`, then it'll ping users in the channel.

+ Word Notify + Blacklist:
                Same notify as Neptune, except now there is \`addblacklist\` and \`removeblacklist\`.
                It does what it says.

+ ARG Related Stuff:
                Added Bot Moderator role. They can do all ARG related stuff. Use \`atl help\` for more.

+ Atlas Help will display what commands you have access to.

Source: http://github.com/Sqbika/NeptuneAkairo/
        `)});
	}
};
