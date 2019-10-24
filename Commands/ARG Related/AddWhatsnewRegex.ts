import {NeptuneCommand} from "../../Framework/NeptuneCommand";
import CommonArguments from "../../Framework/CommonArguments";
import {Message} from "discord.js";
import {PERMISSION} from "../../Framework/Enum/PERMISSION";
import {Arg} from "../../Database/Model/Arg";

export default class AddWhatsnewRegex extends NeptuneCommand {

    constructor() {
        super('addwhatsnewregex', {
            aliases: ['awnr'],
            permission: PERMISSION.ADDWHATSNEWREGEX,
            description: 'Add a new whatsnew regex to the database to trigger it.',
            channel: 'guild',
            args: [
                CommonArguments.Arg_Argument,
                {
                    id: 'regex',
                    match: 'rest',
                    prompt: {
                        retries: 2,
                        start: (msg: Message) => `<@!${msg.author!.id}> Please provide the text you want to set the regex to be.`,
                        retry: (msg: Message) => `<@!${msg.author!.id}> Please provide **ONLY** the text you want to set the regex to be.`
                    },
                    description: 'A Regex which will be added to the list',
                }
            ]
        })
    }

    public async exec(msg: Message, {arg, regex}: { arg: string, regex: string }) {
        if (msg.guild) { //Always true due to restriction.
            let argObj = await Arg.findArg(arg, msg.guild.id);
            if (!argObj) {
                return msg.reply("ARG is not found! This is a bug. Please report to @Sqbika#0657");
            }
            if (argObj.regexes) {
                argObj.regexes.push(regex);
            } else {
                argObj.regexes = [regex];
            }
            argObj.save();
            return msg.reply("Added Whatsnew regex to the ARG.");
        } else {
            return msg.reply("Message was used in DM. Please use this command in a guild.");
        }
    }
}