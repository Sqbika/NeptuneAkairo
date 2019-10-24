import {NeptuneCommand} from "../../Framework/NeptuneCommand";
import CommonArguments from "../../Framework/CommonArguments";
import {Channel, Message} from "discord.js";
import {Arg} from "../../Database/Model/Arg";
import Util from "../../Framework/Util";

export default class Argchannel extends NeptuneCommand {

    constructor() {
        super('argchannel', {
            aliases: ['ac'],
            description: 'Adds the channel for the ARG List',
            channel: 'guild',
            args: [
                CommonArguments.Arg_Argument,
                {
                    id: 'type',
                    type: ['add', 'remove'],
                    prompt: {
                        retries: 2,
                        start: (msg:Message) => `<@!${msg.author!.id}> Do you want to **add** or **remove** a channel?`,
                        retry: (msg:Message) => `<@!${msg.author!.id}> You need to choose either **add** or **remove**`
                    },
                    description: 'You can **add** or **remove**',
                }, {
                    id: 'channel',
                    type: 'channel',
                    prompt: {
                        retries: 2,
                        start: (msg:Message) => `<@!${msg.author!.id}> Please provide a channel to set the ARGs main channel`,
                        retry: (msg:Message) => `<@!${msg.author!.id}> Please provide **ONLY** a channel to set the ARGs main channel`
                    },
                    description: 'Add an ARG channel to watch for the whats new messages.',
                }
            ]
        })
    }

    public async exec(msg:Message, {arg, type, channel}: {arg:string, type:'add'|'remove', channel:Channel}) {
        if (!channel) {
            return msg.reply("Channel not found. Skipping command.");
        }
        let argObj = await Arg.findArg(arg, msg.guild!.id);
        if (argObj) {
            if (type == "add") {
                if (argObj.channels) {
                    if (argObj.channels.indexOf(channel.id) != -1) {
                        return msg.reply("Channel is already part of the channel list. Skipping command.");
                    }
                    argObj.channels.push(channel.id);
                } else {
                    argObj.channels = [argObj.channel!, channel.id];
                }
                return msg.reply("Channel is added to the ARG channel list.");
            } else {
                if (argObj.channels) {
                    if (argObj.channels.indexOf(channel.id) == -1) {
                        return msg.reply("Channel is not part of the channel list. Skipping command.");
                    }
                    argObj.channels = Util.removeIt(channel.id, argObj.channels);
                    argObj.save();
                    return msg.reply("Removed provided channel from the list.");
                } else {
                    argObj.channels = [argObj.channel!];
                    argObj.save();
                    return msg.reply("ARG Channels were not intialized. Skipping command.");
                }
            }
        } else {
            return msg.reply("ARG not found. This is a bug. Please report to @Sqbika#0657");
        }
    }
}