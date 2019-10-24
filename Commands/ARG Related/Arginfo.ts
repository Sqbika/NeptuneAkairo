import {NeptuneCommand} from "../../Framework/NeptuneCommand";
import CommonArguments from "../../Framework/CommonArguments";
import {Message} from "discord.js";
import {Arg} from "../../Database/Model/Arg";
import {ArgalertUsers} from "../../Database/Model/ArgalertUsers";

export default class Arginfo extends NeptuneCommand {

    constructor() {
        super('arginfo', {
           description: 'Gives information about the provided ARG',
           channel: 'guild',
           args: [CommonArguments.Arg_Argument]
        });
    }

    public async exec(msg:Message, {arg}: {arg:string}) {
        let argObj = await Arg.findArg(arg, msg.guild!.id);
        if (!argObj) {
            return msg.reply("ARG not found. This is a bug.");
        }
        let argalertAmount = (await ArgalertUsers.findAll({
            where: {
                argId: argObj.ID!
            }
        })).length;
        return msg.reply({
            embed: this.client.util.embed()
                .setTitle(`Details about ${arg}`)
                .setColor(this.client.config.color)
                .setTimestamp(new Date())
                .addField("Details", `
**MainChannel**: <#${argObj.channel}> (${argObj.channel})
**Channels**: \`${argObj.channels!.map(e => "<#" + e + ">").join(', ')}\`
**Description**: ${argObj.description}
**Wiki**: \`${argObj.wikiurl}\`
**Active**: ${argObj.active ? "Yes" : "No"} 
            `)
                .addField("WhatsNew", `
**Blacklist**: ${argObj.blacklist.length} Users
**RegexList**: ${argObj.regexes.length} Regexes
**Text**: \`${argObj.leavemealone_text}\`
            `)
                .addField("ArgAlert", `
**Users**: ${argalertAmount} Users
            `)
        });
    }
}