const { Command } = require('discord-akairo');

module.exports = class RenameArgCommand extends Command {
	constructor() {
		super('renamearg', {
            description: 'Renames an ARG to the database',
            channelRestriction: 'guild',
			args: [
                {
                    id: "what",
                    type: (word, msg) => {
                        return Object.keys(msg.client.options.get(msg.guild.id, "args")).indexOf(word) !== -1;
                    },
                    prompt: {
                        retries: 2,
                        start: "Please provide a name for the ARG to rename.",
                        retry: "Please provide an existing ARG to rename. ARGs: \`" + Object.keys(msg.client.options.get(msg.guild.id, "args")).join(', ') + "\`"
                    }
                }, {
                    id: "toWhat",
                    type: (word, msg) => {
                        return Object.keys(msg.client.options.get(msg.guild.id, "args")).indexOf(word) == -1;
                    },
                    prompt: {
                        retries: 2,
                        start: "Please provide a name for the ARG for the users to use. It cannot be the same as an existing one.",
                        retry: "Please provide a non-existant name in the database for the ARG. Names in the database: \`" + Object.keys(msg.client.options.get(msg.guild.id, "args")).join(', ') + "\`"
                    }
                }
            ]
		});
	}
    
    userPermissions(msg) {
        return msg.client.settings.get(msg.guild.id, "settings")[admins].indexOf(msg.author.id) !== -1;
    }

	exec(msg, { what, toWhat }) {
        if (msg.deletable && msg.guild.settings.get(msg.guild.id, "settings")["argDelete"]) msg.delete();
        var argObject = msg.guild.settings.get(msg.guild.id, "args");
        argObject[toWhat] = argObject[what];
        delete argObject[what];
        msg.guild.settings.set(msg.guild.id, "args", argObject);
        msg.reply("ARG Successfully renamed in the database.").delete(10000);
    }
}
