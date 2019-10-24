import {NeptuneCommand} from "../../Framework/NeptuneCommand";
import {Argument, ArgumentOptions, Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Help extends NeptuneCommand {

    public constructor() {
        super('help', {
            description: 'It shows information about the provided command',
            usage: 'help command',
            args: [
                <ArgumentOptions> {
                    id: 'command',
                    default: 'showall'
                }
            ]
        })
    }

    public async exec(msg:Message, {command} : {command: string}) {
        if(command == 'showall') {
            let result = this.client.util.embed()
                .setTitle(`Avaliable commands in ${msg.guild ? msg.guild.name : msg.author ? msg.author.username : 'Unknown'}`)
                    .setColor(this.client.config.color)
                .setTimestamp(new Date());
            /*this.client.commandHandler.categories.forEach((cat) => {
                result.addField(cat.id, `\`\`\`\n${cat.filter(me => hasPermission(msg, me)).map(com => `${com.aliases[0]} | ${com.description}`).join('\n')}\n\`\`\``);
            });*/
            msg.channel.send({ embed: result });
        } else {
            let cmd:Command|undefined = this.client.commandHandler.resolver.type('commandAlias')(msg, command);
            if(cmd) {
                msg.channel.send(
                    { embed: this.client.util.embed()
                                 .setColor(this.client.config.color)
                                 .setTimestamp(new Date())
                                 .addField(`Avaliable information about ${cmd.id}`, cmd)
                    });
            } else {

                msg.reply('Command not found.');
            }
        }
    }

    /*static hasPermission(msg, Command) {
        var client = true, command = true;
        var result = true;
        if(Command.ownerOnly) {
            return msg.author.id == msg.client.config.ownerID;
        } else
        if(msg.guild) {
            if(Command.clientPermissions) {
                if (typeof Command.clientPermissions !== "function") {
                    client = msg.guild.me.hasPermission(Command.clientPermissions);
                } else {
                    client = Command.clientPermissions(msg);
                }
            }
            if (Command.userPermissions) {
                if (typeof Command.userPermissions !== "function") {
                    command = msg.member.hasPermission(Command.userPermissions);
                } else {
                    command = Command.userPermissions(msg);
                }
            }
        } else {
            result = Command.channelRestriction !== 'guild';
        }
        return result && client && command;
    }*/
}
