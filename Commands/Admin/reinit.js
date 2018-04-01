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
                    type: (word, msg) => Array.from(msg.client.commandHandler.categories.keys()).concat(['all']).indexOf(word) !== -1 ? true : undefined,
                    match: 'word',
                    default: 'all',
                }
            ]
		});
	}

	exec(msg, { category }) {
        if (category == 'all') {
            msg.client.commandHandler.removeAll(); 
            msg.client.commandHandler.loadAll();
            msg.reply(`Reloaded commands. \nLoaded **${msg.client.commandHandler.categories.size}** categories\nLoaded **${msg.client.commandHandler.modules.size}** Modules.`)
        } else {
            var TEMPCategory = msg.client.commandHandler.categories.get(category);
            TEMPCategory.removeAll();
            var i = 0;
            console.log(path.join(TEMPCategory.filepath, '..'));
            fs.readdirSync(path.join(TEMPCategory.filepath, '..')).forEach((file) => {
                msg.client.commandHandler.load(file);
                i++;
            });
            msg.reply(`Reloaded **${category}**. Loaded modules: **${i}**`);
        }
	}
};