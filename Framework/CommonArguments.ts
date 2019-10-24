import {Message} from "discord.js";
import {Arg} from "../Database/Model/Arg";

export default class CommonArguments {

    public static readonly Arg_Argument = {
        id: 'arg',
        type: async (msg:Message, word:string) => {
            return await Arg.existsByArg(word, msg.guild!.id);
        },
        description: 'An existing ARG in the database',
        prompt: {
            retries: 2,
            start: async (msg:Message) => {
                let args:Arg[] = await Arg.fetchAll(msg.guild!.id);
                return `<@!${msg.author!.id}${`> Please provide an ARG from these: \`${args.map((arg:Arg) => arg.name).join(', ')}\``}`
            },
            retry: async (msg:Message) => {
                let args:Arg[] = await Arg.fetchAll(msg.guild!.id);
                return `<@!${msg.author!.id}${`> You have provided an ARG which is not in the list.\nPlease write an ARG from this list: \`${args.map((arg:Arg) => arg.name).join(', ')}\``}`}
        }
    };
}