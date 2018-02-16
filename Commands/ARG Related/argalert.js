const {
	Command
} = require('discord-akairo');

module.exports = class ArgalertCommand extends Command {
	constructor() {
		super('argalert', {
				description: 'ARGAlert Sub Command.',
				channelRestriction: 'guild',
				args: [{
						id: 'sub',
						type: ['addme', 'removeme', 'notify', 'help'],
						match: 'word',
						default: 'help',
						description: {
							content: 'ARGAlert Plugin sub groups.',
							usage: "<sub> <Text, if sub is notify>",
							examples: ['addme', 'removeme', 'notify WAKING TITAN HAS STARTED']
						}
					}, {
						id: 'ARG',
						type: (word, msg, prevArg) => {
							if (prevArg !== "help") {
									return Object.keys(msg.client.settings.get(msg.guild.id, "args")).indexOf(word) !== -1;
								} else {
									return true;
								}
							},
							match: 'word',
								prompt: {
									retries: 2,
									start: (msg) => {
										return "Please provide an ARG from these: \`" + Object.keys(msg.client.settings.get(msg.guild.id,"args")).join(', ') + "\`";
									},
									retry: (msg) => {
										return "Please provide an ARG from these: \`" + Object.keys(msg.client.settings.get(msg.guild.id, "args")).join(', ') + "\`";
									},
								}
						},
						{
							id: 'text',
							match: 'rest',
							default: "FALSE ALARM!",
							description: "Text for notifying users. <Only people with Admin Rights>"
						}]
				});
		}

		async exec(msg, { sub, arg, text })
		{
			if (msg.deletable) msg.delete();
			var alertObject = msg.client.settings.get(msg.guild.id, "args");
			//[arg]["argalert"];
			switch (sub) {
				case "addme":
					if (alertObject[arg]["argalert"]["users"].indexOf(msg.author.id) == -1)
					{
						alertObject[arg]["argalert"]["users"].push(msg.author.id);
						msg.client.settings.set(msg.guild.id, "args", alertObject);
						msg.reply("Added you to the notification list.").then(msg => msg.delete(5000));
					} else {
						msg.reply("You are already on the notification list.").then(msg => msg.delete(5000));
					}
				break;
				case "removeme":
					if (alertObject[arg]["argalert"]["users"].indexOf(msg.author.id) !== -1)
					{
						alertObject[arg]["argalert"]["users"].splice(alertObject[arg]["argalert"]["users"].indexOf(msg.author.id), 1);
						msg.client.settings.set(msg.guild.id, "args", alertObject);
						msg.reply("Removed you to the notification list.").then(msg => msg.delete(5000));
					} else {
						msg.reply("You are not in the notification list, so nothing to remove.").then(msg => msg.delete(5000));
					}
				break;
				case "notify":
					if (msg.client.settings.get(msg.guild.id, "settings")["admins"].indexOf(msg.author.id) !== -1) {
						meg.guild.channels.get(alertObject[arg]["argalert"]["channel"]).send(argString(text));
						meg.guild.channels.get(alertObject[arg]["argalert"]["channel"]).send(usersString(msg, arg), {
							split: {
								char: ' '
							}
						}).then(msg => {
							msg.forEach((ele) => {
								ele.delete(300)
							});
						});
					} else {
						msg.channel.send("You have no permission to use this sub-command.").then(msg => msg.delete(5000));
					}
					break;
				case "help":
					msg.channel.send(helpstring(msg));
			}
	}
}

function helpstring(msg) {
return `
Possible Commands:

**addme**: Subscribes you to the ARG notification. | Usage: nep argalert <argName> addme
**removeme**: Unsubscribes you from the ARG notification | Usage: nep argalert <argName> removeme
**notify**: Notifies the users in the list about the arg + string (MODERATORS ONLY) | Usage: nep argalert <argName> notify <string>
**help**: This. | Usage: nep argalert help

Possible <argName>s: \`${Object.keys(msg.client.options.get(msg.guild.id, "args")).join(", ")}\`
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
`
}

function usersString(msg, arg) {
	var json = msg.client.settings.get(msg.guild.id, "args")[arg]["argalert"]["users"];
	var userstring = "";
	json.users.forEach((ele) => {
		userstring += "<@!" + ele + "> ";
	});
	return userstring;
}