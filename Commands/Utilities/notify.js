const { Command } = require('discord-akairo');

module.exports = class NotifyCommand extends Command {
	constructor() {
		super('notify', {
			aliases: ['notify'],
			channel: 'guild',
			args: [
				{
					id: 'sub',
					type: ['addpin', 'addword', 'removepin', 'removeword', 'enable', 'disable', 'list', 'help'],
					default: 'help',
					description: {
						content: 'Notification plugin.',
						usage: '<sub> <argument depending on sub> <words if sub is addword>',
						examples: ['addpin #channel-name', 'addword anywhere Sqbika']
					}
				}, {
					id: 'arg2',
					type: (word, message, args) => {
						switch(args.sub) {
							case 'addpin':
							case 'addword':
								return (this.handler.resolver.type('textChannel')(word, message) || word == "anywhere");
							case 'removepin':
							case 'removeword':
							case 'enable':
							case 'disable':
								return this.handler.resolver.type('integer')(word);
							case 'help':
							case 'list':
								return true;
						}
					},
					prompt: {
						start: (msg, args) => {
							switch(args.sub) {
								case 'addpin':
								case 'addword':
									return 'Please provide a channel ID or <anywhere>';
								case 'removepin':
								case 'removeword':
								case 'enable':
								case 'disable':
									return 'Please provide a notify ID';
								default:
									return 'Oopsie. Error found. Please report it.';
							}
						},
						retry: (msg, args) => {
							switch(args.sub) {
								case 'addpin':
								case 'addword':
									return 'Please provide a valid channel ID or <anywhere>';
								case 'removepin':
								case 'removeword':
								case 'enable':
								case 'disable':
									return 'Please provide a valid notify ID';
								default:
									return 'Oopsie. Error found. Please report it.';
							}
						},
						optional: true
					},
					default: (msg, args) => {
						switch(args.sub) {
							case 'help':
								return 'help';
							case 'list':
								return 'list';
						}
					}
				},
				{
					id: 'words',
					prompt: { start: 'Please provide the word you want to get notified about.', optional: true },
					match: 'rest',
					default: (msg, args) => {
						console.log(args.sub);
						if(args.sub !== 'addword')	{
							return 'nothing';
						}
					},
				}
			]
		});
	}

	async exec(msg, { sub, arg2, words }) {
		if (typeof arg2.type !== "undefined") arg2 = arg2.id;
		switch(sub) {
			case 'addword':
				msg.reply(msg.client.notify.addWordNotify(msg, words, arg2));
				break;
			case 'addpin':
				msg.reply(msg.client.notify.addPinNotify(msg, arg2));
				break;
			case 'removeword':
				msg.reply(msg.client.notify.removeWordNotify(msg, arg2));
				break;
			case 'removepin':
				msg.reply(msg.client.notify.removePinNotify(msg, arg2));
				break;
			/* case "enable":
				if (arg2 == "anywhere") {
					msg.channel.send("Please provide an ID to enable.");
				} else {
					msg.channel.send(msg.client.notify.enableN(msg, arg2));
				}
				break;
			case "disable":
				if (arg2 == "anywhere") {
					msg.channel.send("Please provide an ID to disable.");
				} else {
					msg.channel.send(msg.client.notify.disableN(msg, arg2));
				}*/
			case 'list':
				msg.reply(msg.client.notify.listNotifies(msg));
				break;
			case 'help':
				msg.reply(helpstring);
		}
	}
}
;

var helpstring = `
Possible Commands:

removeword and removepin requires using a Notify ID. You can get them by using \`atl notify list\`

**addword**: Adds a new word notify whenever something mentioned in the channelID. | Usage: atl notify addword <channelID or anywhere> [words (Goes Infinite)]
**addpin**: Adds a new pin notify. | Usage: atl notify addpin <channelID or anywhere>
**removeword**: Removes the word notify from the word list | Usage: atl notify removeword <notifyID>
**removepin**: Removes thes pin notify from the pin list | Usage: atl notify removepin <notifyID>
**list**: Lists the notify you currently have | Usage: atl notify list
**help**: This. | Usage: atl notify help
`;
