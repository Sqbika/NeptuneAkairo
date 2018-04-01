const { Command } = require('discord-akairo');

module.exports = class ArginfoCommand extends Command {
	constructor() {
		super('arginfo', {
			aliases: ['arginfo'],
			usage: 'arginfo <ARG>',
			description: 'Lists information about an ARG.',
			channelRestriction: 'guild',
			args: [
				{
					id: 'argName',
					type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
					prompt: {
						retries: 2,
						start: 'Please provide a name for the ARG to set the main channel.',
						retry: (msg) => `Please provide an existing ARG to set the main channel. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
					},
					description: 'An ARG Name, which is in the database.',
					usage: '<string>'
				}
			]
		});
	}

	exec(msg, { argName }) {
        var arg = msg.client.settings.get(msg.guild.id, 'args')[argName];
        var result = msg.client.util.embed()
            .setTitle(`Details about ${argName}`)
            .setColor(msg.client.config.color)
            .setTimestamp(new Date())
            .addField("Details", `
**MainChannel**: <#${arg.channel}> (${arg.channel})
**Channels**: \`${arg.channels.map(e => "<#" + e + ">").join(', ')}\`
**Description**: ${arg.details.description}
**Wiki**: \`${arg.details.wiki}\`
**Active**: ${arg.details.active} 
            `)
            .addField("WhatsNew", `
**Blacklist**: ${arg.leavemealone.blacklist.length} Users
**RegexList**: ${arg.leavemealone.regexList.length} Regexes
**Text**: \`${arg.leavemealone.text}\`
            `)
            .addField("ArgAlert", `
**Users**: ${arg.argalert.users.length} Users
            `);
        msg.reply({embed: result});
	}
};

/*
            leavemealone: {
                blacklist: [],
                regexList: [],
                text: ""
            }
            argalert: {
                channel: "",
                users: []
            }
            channels: [],
            details: {
                description: "",
                wiki: "",
                active: true/false
            }

*/
