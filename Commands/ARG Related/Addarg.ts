import {NeptuneCommand} from "../../Framework/NeptuneCommand";
import {PERMISSION} from "../../Framework/Enum/PERMISSION";
import {Message} from "discord.js";
import {Arg} from "../../Database/Model/Arg";

export default class Addarg extends NeptuneCommand {
    constructor() {
        super('addarg', {
            permission: PERMISSION.ADDARG,
            description: 'A command to new arg to the database',
            channel: 'guild',
            args: [{
                id: 'argname',
                type: async (msg:Message, word:string) => {
                    return !Arg.existsByArg(word, msg.guild!.id);
                },
                prompt: {
                    retries: 2,
                    start: (msg:Message) => `<@!${msg.author!.id}> Please provide a name for the ARG for the users to use. It cannot be the same as an existing one.\nType \`cancel\` to cancel`,
                    retry: async (msg:Message) => {
                        let args:Arg[] = await Arg.fetchAll(msg.guild!.id);
                        return `<@!${msg.author!.id}${`> You have provided a non-existant ARG or did a typo.\nPlease provide **ONLY** a non-existant name in the database for the ARG.\nNames in the database: \`${args.map(arg => arg.name).join(', ')}\``}`
                    }
                }
            }]
        });
    }

    async exec(msg:Message, {argname}: {argname:string}) {
        Arg.create({
            guild: msg.guild!.id,
            channel: msg.channel!.id,
            name: argname,
            active: true
        });
        msg.reply("Successfully added ARG to the database.");
    }
}