const { Command } = require('discord-akairo');

module.exports = class NotifyCommand extends Command {
	constructor() {
		super('notify', {
			channel: 'guild',
			args: [
				{
					id: 'sub',
					type: ['addpin', 'addword', 'removepin', 'removeword', 'enable', 'disable', 'list', 'help'],
					default: 'help',
					description: 'Choose one of the sub commands.'
				}, {
					id: 'arg2',
					type: (word, message, args) => {
						switch(args.sub) {
							case 'addpin':
							case 'addword':
								return 'textChannel';
							case 'removepin':
							case 'removeword':
							case 'enable':
							case 'disable':
								return 'integer';
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
							}
						}
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
					default: (msg, args) => {
						if(args.sub !== 'addword')	{
							return 'nothing';
						}
					},
					prompt: { start: 'Please provide the word you want to get notified about.' },
					match: 'rest'
				}
			]
		});
	}

	async exec(msg, { sub, arg2, words }) {
        switch (sub) {
			case "addword":
				msg.reply(msg.client.sqbika.notify.addWordNotify(msg, words, arg2));
				break;	
			case "addpin":
				msg.reply(msg.client.sqbika.notify.addPinNotify(msg, arg2));
				break;
			case "removeword":
				msg.reply(msg.client.sqbika.notify.removeWordNotify(msg, arg2));
				break;
			case "removepin":
				msg.reply(msg.client.sqbika.notify.removePinNotify(msg, arg2));
				break;
			/*case "enable":
				if (arg2 == "anywhere") {
					msg.channel.send("Please provide an ID to enable.");
				} else {
					msg.channel.send(msg.client.sqbika.notify.enableN(msg, arg2));
				}
				break;
			case "disable":
				if (arg2 == "anywhere") {
					msg.channel.send("Please provide an ID to disable.");
				} else {
					msg.channel.send(msg.client.sqbika.notify.disableN(msg, arg2));
				}*/
			case "list":
				msg.reply(msg.client.sqbika.notify.listNotifies(msg));
				break;
			case "help":
				msg.reply(helpstring);
		}
	}
}
;

var helpstring = `
Possible Commands:

removeword and removepin requires using a Notify ID. You can get them by using \`nep notify list\`

**addword**: Adds a new word notify whenever something mentioned in the channelID. | Usage: nep notify addword <channelID or anywhere> [words (Goes Infinite)]
**addpin**: Adds a new pin notify. | Usage: nep notify addpin <channelID or anywhere>
**removeword**: Removes the word notify from the word list | Usage: nep notify removeword <notifyID>
**removepin**: Removes thes pin notify from the pin list | Usage: nep notify removepin <notifyID>
**list**: Lists the notify you currently have | Usage: nep notify list
**help**: This. | Usage: nep notify help
`;
