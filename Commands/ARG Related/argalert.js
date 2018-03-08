const { Command } = require('discord-akairo');

module.exports = class ArgalertCommand extends Command {
	constructor() {
		super('argalert', {
			aliases: ['argalert'],
			description: 'ARGAlert Sub Command.',
			usage: 'See argalert help',
			channelRestriction: 'guild',
			args: [{
				id: 'sub',
				type: ['addme', 'removeme', 'notify', 'help'],
				match: 'word',
				default: 'help',
				description: 'ARGAlert Plugin sub groups.',
				usage: '<sub> <Text, if sub is notify>',
				examples: ['addme', 'removeme', 'notify WAKING TITAN HAS STARTED']
			}, {
				id: 'arg',
				type: (word, msg, prevArg) => {
					if(prevArg !== 'help') {
						return Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined;
					} else {
						return true;
					}
				},
				match: 'word',
				prompt: {
					retries: 2,
					start: (msg) => `Please provide an ARG from these: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``,
					retry: (msg) => `Please provide an ARG from these: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``
				},
				description: 'An ARG Name, which is in the database.',
				usage: '<string>'
			},
			{
				id: 'text',
				match: 'rest',
				default: 'FALSE ALARM!',
				description: 'Text for notifying users. <Only people with Admin Rights>',
				usage: '<string (infinite)>'
			}]
		});
	}

	async exec(msg, { sub, arg, text })		{
		if(msg.deletable && msg.client.settings.get(msg.guild.id, 'settings').argDelete) msg.delete();
		var alertObject = msg.client.settings.get(msg.guild.id, 'args');
			// [arg]["argalert"];
		switch(sub) {
			case 'addme':
				if(alertObject[arg].argalert.users.indexOf(msg.author.id) == -1)					{
					alertObject[arg].argalert.users.push(msg.author.id);
					msg.client.settings.set(msg.guild.id, 'args', alertObject);
					msg.reply('Added you to the notification list.').then(msg => msg.delete(5000));
				} else {
					msg.reply('You are already on the notification list.').then(msg => msg.delete(5000));
				}
				break;
			case 'removeme':
				if(alertObject[arg].argalert.users.indexOf(msg.author.id) !== -1)					{
					alertObject[arg].argalert.users.splice(alertObject[arg].argalert.users.indexOf(msg.author.id), 1);
					msg.client.settings.set(msg.guild.id, 'args', alertObject);
					msg.reply('Removed you to the notification list.').then(msg => msg.delete(5000));
				} else {
					msg.reply('You are not in the notification list, so nothing to remove.').then(msg => msg.delete(5000));
				}
				break;
			case 'notify':
				if(msg.client.settings.get(msg.guild.id, 'settings').admins.indexOf(msg.author.id) !== -1) {
					msg.guild.channels.get(alertObject[arg].argalert.channel).send(argString(text));
					msg.guild.channels.get(alertObject[arg].argalert.channel).send(usersString(msg, arg), { split: { char: ' ' } }).then(msgs => {
						if(typeof msgs === Array) {
							msgs.forEach((ele) => {
								ele.delete(300);
							});
						} else {
							msgs.delete(300);
						}
					});
				} else {
					msg.channel.send('You have no permission to use this sub-command.').then(msg => msg.delete(5000));
				}
				break;
			case 'help':
				msg.channel.send(helpstring(msg));
		}
	}
};

function helpstring(msg) {
	return `
Possible Commands:

**addme**: Subscribes you to the ARG notification. | Usage: nep argalert addme <argName>
**removeme**: Unsubscribes you from the ARG notification | Usage: nep argalert removeme <argName>
**notify**: Notifies the users in the list about the arg + string (MODERATORS ONLY) | Usage: nep argalert notify <argName> <string>
**help**: This. | Usage: nep argalert help

Possible <argName>s: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\`
`;
}

function argString(input) {
	return `
༼ つ ◕◕ ༽つ ARG ALERT! ༼ つ ◕◕ ༽つ
A new arg notification has arrived!

\`\`\`
${input}
\`\`\`
༼ つ ◕◕ ༽つ ARG ALERT! ༼ つ ◕◕ ༽つ
`;
}

function usersString(msg, arg) {
	var json = msg.client.settings.get(msg.guild.id, 'args')[arg].argalert.users;
	var userstring = '';
	json.forEach((ele) => {
		userstring += `<@!${ele}> `;
	});
	return userstring;
}
