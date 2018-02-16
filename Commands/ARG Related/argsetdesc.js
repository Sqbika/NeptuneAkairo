const { Command } = require('discord-akairo');

module.exports = class ArgSetDescriptionCommand extends Command {
	constructor() {
		super('argsetdesc', {
            description: 'Sets an ARGs Description.',
            channelRestriction: 'guild',
			args: [
                {
                    id: "arg",
                    type: (word, msg) => {
                        return Object.keys(msg.client.options.get(msg.guild.id, "args")).indexOf(word) !== -1;
                    },
                    prompt: {
                        retries: 2,
                        start: "Please provide of the ARG.",
                        retry: "Please provide an existing ARG. ARGs: \`" + Object.keys(msg.client.options.get(msg.guild.id, "args")).join(', ') + "\`"
                    }
                }, {
                    id: "text",
                    match: 'rest',
                    prompt: {
                        retries: 2,
                        start: "Please provide the text you want to set the Description to be.",
                        retry: "Please provide the text you want to set the Description to be."
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
        argObject[arg]["details"]["description"] = text
        msg.guild.settings.set(msg.guild.id, "args", argObject);
        msg.reply("Successfully set the Description for the ARG.").delete(10000);
    }
}
