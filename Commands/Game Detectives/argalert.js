const { Command } = require('discord.js-commando');
const jp = require('fs-jetpack');

const subs = [ 'addme', 'removeme', 'notify', 'help'];

const { Command } = require('discord-akairo');

module.exports = class ArgalertCommand extends Command {
	constructor() {
		super('argalert', {
            description: 'ARGAlert Sub Command.',
            channelRestriction: 'guild',
			args: [{
				id: 'qstring',
				match: 'content'
			}]
		});
	}
}

module.exports = class ArgAlertCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'argalert',
			group: 'gd',
			memberName: 'argalert',
			description: 'Subscription based ARG notifier.',
			format: '<sub-command>',
			args: [{
				key: 'sub',
				prompt: 'Provide sub-command. Valid ones: \addme\nremoveme\nnotify\nhelp',
				validate: function (input) { return subs.indexOf(input) !== -1 },
				type: 'string',
				default: 'help'
			},{
				key: 'notification',
				prompt: 'The string you want the users to notify about.',
				type: "string",
				default: 'False Alert!'
			}],
			guildOnly: true
		});
	}

	async run (msg, { sub, notification}) {
		if (msg.channel.id == "160894083173318666" || msg.member.roles.has('206865957333893120') || msg.client.isOwner(msg.author.id)) {
		switch (sub) {
			case "addme":
				var json = getJSON();
				if (json.users.indexOf(msg.author.id) == -1) {
					json.users.push(msg.author.id)
					writeJSON(json);
					msg.reply("Added you to the notification list.").then(msg => msg.delete(5000));
				} else {
					msg.reply("You are already on the notification list.").then(msg => msg.delete(5000));
				}
				break;	
			case "removeme":
				var json = getJSON();
				if (json.users.indexOf(msg.author.id) !== -1) {
					json.users.splice(json.users.indexOf(msg.author.id), 1)
					writeJSON(json);
					msg.reply("Removed you to the notification list.").then(msg => msg.delete(5000));
				} else {
					msg.reply("You are not in the notification list, so nothing to remove.").then(msg => msg.delete(5000));
				}
				break;
			case "notify":
				if (msg.member.roles.has('206865957333893120') || msg.client.isOwner(msg.author.id)) {
					msg.channel.send(argString(notification));
					msg.channel.send(usersString(), {split: {char: ' '}}).then(msg => {
					    msg.forEach((ele) => { ele.delete(300) });
					});
				} else {
					msg.channel.send("You have no permission to use this sub-command.").then(msg => msg.delete(5000));
				}
				break;
			case "help":
				msg.channel.send(helpstring);
		}
		} else {
			msg.client.channels.get('160894083173318666').send("<@!" + msg.author.id + "> Please use this plugin in here. Thank you!");
		}
	}
}

var helpstring = `
Possible Commands:

**addme**: Subscribes you to the ARG notification. | Usage: nep argalert addme
**removeme**: Unsubscribes you from the ARG notification | Usage: nep argalert removeme
**notify**: Notifies the users in the list about the arg + string (MODERATORS ONLY) | Usage: nep argalert notify <string>
**help**: This. | Usage: nep argalert help
`;

function getJSON() {
	return jp.read('/home/sqbika/Bots/Neptunev11/jsons/argalert.json', 'json');
}

function writeJSON(json) {
	jp.write('/home/sqbika/Bots/Neptunev11/jsons/argalert.json', json);
}

function argString(input) {
	return `
༼ つ ◕◕ ༽つ ARG ALERT! ༼ つ ◕◕ ༽つ
A new arg notification has arrived!

\`\`\`
${input}
\`\`\`
༼ つ ◕◕ ༽つ ARG ALERT! ༼ つ ◕◕ ༽つ
`
}

function usersString() {
	var json = getJSON();
	var userstring = "";
	json.users.forEach((ele) =>{
		userstring += "<@!" + ele + "> ";
	});
	return userstring;
}


