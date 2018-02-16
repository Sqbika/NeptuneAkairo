const { Command } = require('discord-akairo');

module.exports = class ArgSetWhatsNewCommand extends Command {
	constructor() {
		super('setwhatsnew', {
            description: 'Sets an ARGs Whats New Message.',
            channelRestriction: 'guild',
			args: [
                {
                    id: "arg",
                    type: (word, msg) => {
                        return Object.keys(msg.client.options.get(msg.guild.id, "args")).indexOf(word) !== -1;
                    },
                    prompt: {
                        retries: 2,
                        start: "Please provide a name for the ARG to set the main channel.",
                        retry: "Please provide an existing ARG to set the main channel. ARGs: \`" + Object.keys(msg.client.options.get(msg.guild.id, "args")).join(', ') + "\`"
                    }
                }, {
                    id: "text",
                    match: 'rest',
                    prompt: {
                        retries: 2,
                        start: "Please provide the text you want to set the Whats New message to be.",
                        retry: "Please provide the text you want to set the Whats New message to be."
                    }
                }
            ]
		});
    }
    
    userPermissions(msg) {
        return msg.client.settings.get(msg.guild.id, "settings")[admins].indexOf(msg.author.id) !== -1;
    }

	exec(msg, { arg, text }) {
        if (msg.deletable && msg.guild.settings.get(msg.guild.id, "settings")["argDelete"]) msg.delete();
        var argObject = msg.guild.settings.get(msg.guild.id, "args");
        argObject[arg]["whatsnew"]["text"] = text
        msg.guild.settings.set(msg.guild.id, "args", argObject);
        msg.reply("Successfully set the Whats New message for the ARG.").delete(10000);
    }
}