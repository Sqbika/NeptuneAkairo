import {NeptuneCommand} from "../../Framework/NeptuneCommand";
import {PERMISSION} from "../../Framework/Enum/PERMISSION";
import {Message} from "discord.js";
import {AkairoModule} from "discord-akairo";

export default class Reload extends NeptuneCommand {

    public constructor() {
        super('reload', {
            description: 'A command to reload other commands.',
            permission: PERMISSION.RELOAD,
            args: [
                {
                    id: 'module',
                    type: 'string'
                }
            ]
        })
    }

    public exec(message:Message, {module} : {module:string}) {
        const types = ['commandAlias', 'inhibitor', 'listener'];
        for (let type in types) {
            let resolver = this.client.commandHandler.resolver.type(type);
            if (resolver) {
                let command:AkairoModule = resolver(message, module);
                if (command) {
                    command.reload();
                    message.reply(`Successfully reloaded \`${command.id}\``);
                    return;
                }
            }
        }
        message.reply(`No Command/Inhibitor/Listener found with \`${module}\``);
    }
}