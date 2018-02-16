const { Command } = require('discord-akairo');

module.exports = class ArgSetChannelCommand extends Command {
	constructor() {
		super('argsetchannel', {
            description: 'Sets an ARGs channel.',
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
                    id: "channel",
                    type: 'channel',
                    prompt: {
                        retries: 2,
                        start: "Please provide a channel to set the ARGs main channel",
                        retry: "Please provide a channel to set the ARGs main channel"
                    }
                }
            ]
		});
	}

	exec(msg, { arg, channel }) {
        if (msg.deletable && msg.guild.settings.get(msg.guild.id, "settings")["argDelete"]) msg.delete();
        var argObject = msg.guild.settings.get(msg.guild.id, "args");
        argObject[arg]["channel"] = channel.id;
        msg.guild.settings.set(msg.guild.id, "args", argObject);
        msg.reply("Successfully set the channel for the ARG.").delete(10000);
    }
}
