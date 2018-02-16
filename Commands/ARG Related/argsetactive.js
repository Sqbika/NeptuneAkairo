const { Command } = require('discord-akairo');

module.exports = class ArgSetActivityCommand extends Command {
	constructor() {
		super('argsetactive', {
            description: 'Sets an ARGs Active.',
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
                    id: "active",
                    prompt: {
                        retries: 2,
                        start: "Please provide the text you want to set the Active to be.",
                        retry: "Please provide the text you want to set the Active to be."
                    }
                }
            ]
		});
    }
    
    userPermissions(msg) {
        return msg.client.settings.get(msg.guild.id, "settings")[admins].indexOf(msg.author.id) !== -1;
    }

	exec(msg, { arg, active }) {
        if (msg.deletable && msg.guild.settings.get(msg.guild.id, "settings")["argDelete"]) msg.delete();
        var argObject = msg.guild.settings.get(msg.guild.id, "args");
        switch(active.toLowerCase()) {
            case "active":
            case "true":
            case "yes":
            case true:
                active = true;
                break;
            case "inactive":
            case "false":
            case "no":
            case false:
                active = false;
                break;
        }
        argObject[arg]["details"]["active"] = active
        msg.guild.settings.set(msg.guild.id, "args", argObject);
        msg.reply("Successfully set the Active for the ARG.").delete(10000);
    }
}