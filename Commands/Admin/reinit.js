const { Command } = require('discord-akairo');
const path = require('path');
const fs = require('fs');

module.exports = class ReinitCommand extends Command {
	constructor() {
		super('reinit', {
			aliases: ['reinit', 'ri'],
			description: 'Reinitializes all the commands (Loads new ones).',
			ownerOnly: true,
            protected: true,
            args: [
                { 
                    id: 'category',
                    type: (word, msg) => Array.from(msg.client.commandHandler.categories.keys()).push('all'),
                    default: 'all',
                }
            ]
		});
	}

	exec(msg, { category }) {
        if (category == 'all') {
            client.commandHandler.removeAll(); 
            client.commandHandler.loadAll();
            msg.reply(`Reloaded commands. \nLoaded **${client.commandHandler.categories.size}** categories\nLoaded **${client.commandHandler.modules.size}`)
        } else {
            var TEMPCategory = client.commandHandler.get(category);
            TEMPCategory.removeAll();
            var i = 0;
            fs.readdirSync(path.join(TEMPCategory.filepath, '..')).forEach((file) => {
                client.commandHandler.load(file);
                i++;
            });
            msg.reply(`Reloaded **${category}**. Loaded modules: **${i}**`);
        }
	}
};
