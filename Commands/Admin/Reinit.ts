import {NeptuneCommand} from "../../Framework/NeptuneCommand";
import {PERMISSION} from "../../Framework/Enum/PERMISSION";
import {Message} from "discord.js";
import {Category, Command} from "discord-akairo";
import * as fs from "fs";
import * as path from "path";

export default class Reinit extends NeptuneCommand {

    public constructor() {
        super('reinit', {
            permission: PERMISSION.REINIT,
            description: 'Reloads all the modules across the bot.',
            args: [
                {
                    id: 'category',
                    type: (_, word:string) => {
                        return word == "all" || this.client.commandHandler.categories.has(word);
                    },
                    match: 'rest',
                    default: 'all'
                }
            ]
        })
    }

    public exec(msg:Message, {category}: {category: string}) {
        if (category == 'all') {
            this.client.commandHandler.removeAll();
            this.client.commandHandler.loadAll();
            msg.reply(`Reloaded commands. \nLoaded **${this.client.commandHandler.categories.size}** categories\nLoaded **${this.client.commandHandler.modules.size}** Modules.`)
        } else {
            let TEMPCategory:Category<string, Command>|undefined = this.client.commandHandler.categories.get(category);
            if (TEMPCategory) {
                let cmd = TEMPCategory.first();
                if (cmd) {
                    let catpath = cmd.filepath;
                    TEMPCategory.removeAll();
                    var i = 0;
                    fs.readdirSync(path.join(catpath, '..')).forEach((file) => {
                        this.client.commandHandler.add(file.split('.')[0]);
                        i++;
                    });
                    msg.reply(`Reloaded **${category}**. Loaded modules: **${i}**`);
                } else {
                    msg.reply("Could not find filepath of group " + category);
                }
            } else {
                msg.reply("Could not find category.");
            }
        }
    }
}
