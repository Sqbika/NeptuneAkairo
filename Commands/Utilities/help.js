const { Command } = require('discord-akairo');

module.exports = class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help'],
			usage: 'help <command>',
			description: 'Lists all the commands',
			args: [{
				id: 'command',
				default: 'showall'
			}]
		});
	}

	exec(msg, { command }) {
		if(command == 'showall') {
			var result = msg.client.util.embed()
				.setTitle(`Avaliable commands in ${msg.guild ? msg.guild.name : msg.author.username}`)
				.setColor(msg.client.config.color)
				.setTimestamp(new Date());
			msg.client.commandHandler.categories.map(me => me).forEach((cat) => {
				result.addField(cat.id, `\`\`\`\n${cat.filter(me => hasPermission(msg, me)).map(com => `${com.aliases[0]} | ${com.description}`).join('\n')}\n\`\`\``);
			});
			msg.channel.send({ embed: result });
		} else {
			var cmd = this.client.commandHandler.resolver.type('commandAlias')(command);
			if(cmd) {
				var result = msg.client.util.embed()
					.setColor(msg.client.config.color)
					.setTimestamp(new Date())
					.addField(`Avaliable information about ${cmd.id}`, funcDesc(cmd));
				msg.channel.send({ embed: result });
			} else {
				msg.reply('Command not found.');
			}
		}
	}
};

function funcDesc(command) {
	return `
**Description**: ${typeof command.description === Array ? command.description.join('\n') : command.description}
**Usage**: ${command.usage ? `${command.client.config.prefix} ${command.usage}` : command.client.config.prefix + " " + command.args.map(ar => "<" + ar.id + ">").join(' ') + "   (Generated.)"}
**Enabled**: ${command.enabled}
**Aliases**: \`${command.aliases.join(', ')}\`
**Category**: \`${command.category}\`
**Restriction**: \`${command.channelRestriction ? command.channelRestriction == 'guild' ? 'Guild Only' : 'DM Only' : 'None.'}\`
**Arguments**: 
${command.args.map(ar => `  -**Name**: ${ar.id}
  -**Description**: ${ar.description.description !== undefined ? ar.description.description : 'No Argument Description was Provided. Yell at Developer please!'}
  -**Usage**: ${ar.description.usage !== undefined ? ar.description.usage : 'No Argument Usage was Provided. Yell at Developer please!'}
 `).join('\n')}

 **Cooldown**: ${command.cooldown ? `${command.cooldown} ms` : 'No Cooldown'}
 **Ratelimit**: ${command.cooldown ? `${command.ratelimit} usage per cooldown` : 'Disabled'} 

 **User Permission Required**: ${command.userPermissions ? `Yes: ${command.userPermissions}` : 'No'}
 **Bot Permission Required**: ${command.clientPermissions ? `Yes: ${command.clientPermissions}` : 'No'}
`;
}

function hasPermission(msg, Command) {
	var client = true, command = true;
	var result = true;
	if(Command.ownerOnly) {
		return msg.author.id == msg.client.config.ownerID;
	} else 
	if(msg.guild) {
		if(Command.clientPermissions) {
			if (typeof Command.clientPermissions !== "function") {
				client = msg.guild.me.hasPermission(Command.clientPermissions);
			} else {
				client = Command.clientPermissions(msg);
			}
		}
		if (Command.userPermissions) {
			if (typeof Command.userPermissions !== "function") {
				command = msg.member.hasPermission(Command.userPermissions);
			} else {
				command = Command.userPermissions(msg);
			}
		}
	} else {
		result = Command.channelRestriction !== 'guild';
	}
	return result && client && command;
}
