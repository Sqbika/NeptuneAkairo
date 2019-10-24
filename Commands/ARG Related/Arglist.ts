import {NeptuneCommand} from "../../Framework/NeptuneCommand";
import {Message} from "discord.js";
import {Arg} from "../../Database/Model/Arg";

export default class Arglist extends NeptuneCommand {
    constructor() {
        super('arglist', {
            description: 'Lists all the ARGs that are in the database',
            channel: 'guild',
            ratelimit: 10000
        })
    }

    public exec(msg:Message) {
        Arg.fetchAll(msg.guild!.id).then(args => {
            let result = '**List of ARGs**\nActive ARGs:\n```\n';
            let active:string[] = [];
            let inactive:string[] = [];
            args.forEach((arg) => {
                if (arg.active) {
                    active.push(`[${arg.name}] - ${arg.description}\nWiki:<${arg.wikiurl}>`);
                } else {
                    inactive.push(`[${arg.name}] - ${arg.description}\nWiki:<${arg.wikiurl}>`);
                }
            });
            result += active.length == 0 ? "None." : active.join('\n');
            result += '```\nInactive ARGs\n```\n ';
            result += inactive.length == 0 ? "None." : inactive.join('\n');
            result += '```';
            msg.reply(result, { split: { prepend: '```', append: '```' } });
        });
    }
}