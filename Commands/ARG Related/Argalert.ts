import {NeptuneCommand} from "../../Framework/NeptuneCommand";
import {GuildChannel, Message, TextBasedChannel, TextChannel} from "discord.js";
import {Arg} from "../../Database/Model/Arg";
import CommonArguments from "../../Framework/CommonArguments";
import {ArgumentMatch} from "discord-akairo";
import {User} from "../../Database/Model/User";
import {ArgalertUsers} from "../../Database/Model/ArgalertUsers";
import {PERMISSION} from "../../Framework/Enum/PERMISSION";

export default class Argalert extends NeptuneCommand {

    public constructor() {
        super('argalert', {
            description: 'Argalert for ARGs to alert users about something!',
            channel: 'guild',
        })
    }

    public args = function* (message: Message) {
        let sub = yield {
            id: 'sub',
            type: ['addme', 'removeme', 'notify', 'help', 'embed'],
            default: 'help',
        };

        if (sub == "help") {
            return;
        } else {
            yield CommonArguments.Arg_Argument;
            if (sub == "notify") {
                yield {
                    id: 'text',
                    match: <ArgumentMatch>"rest",
                    default: 'FALSE ALARM!',
                    description: 'The text for the argalert (Special permission required to trigger argalert.)'
                };
                yield {
                    id: 'test',
                    match: <ArgumentMatch>"flag",
                    flag: '--test'
                };
            }
        }
    };

    public async exec(msg: Message, {sub, arg, text, test}: { sub: string, arg: string | undefined, text: string | undefined, test: boolean }) {
        if (sub == "help") {
            let args = await Arg.fetchAll(msg.guild!.id);
            return msg.reply(this.helpstring(args.map((arg: Arg) => arg.name)));
        } else {
            if (arg) {
                let theArg: Arg | null = await Arg.findArg(arg, msg.guild!.id);
                if (theArg == null) {
                    return msg.reply("ARG not found! Error in system. Please contact @Sqbika#0657");
                }
                let user: User = await User.forceFind(msg.author!.id, msg.guild!.id);
                switch (sub) {
                    case "addme":
                        if (user.hasArgalert(theArg!.ID!)) {
                            return msg.reply("You are already subscribed to the argalert.");
                        } else {
                            ArgalertUsers.create({
                                userId: user.ID,
                                argId: theArg.ID
                            });
                            return msg.reply('Added you to the notification list.');
                        }
                        break;
                    case "removeme":
                        if (user.hasArgalert(theArg!.ID!)) {
                            ArgalertUsers.findOne({
                                where: {
                                    argId: theArg!.ID!,
                                    userId: user.ID!
                                }
                            }).then((argalertUser: ArgalertUsers | null) => {
                                if (argalertUser)
                                    argalertUser.destroy();
                            });
                            return msg.reply('Removed you from the notification list.');
                        } else {
                            return msg.reply("You are currently not subscribed to this ARG. Ignoring command.");
                        }
                    case "notify":
                        if (user.hasPermission(PERMISSION.NOTIFY.code)) {
                            let users: ArgalertUsers[] = await ArgalertUsers.findAllByArg(theArg);
                            let channel = test ? msg.channel : <TextChannel>msg.guild!.channels.find((value) => {
                                return value.id == theArg!.channel
                            });
                            channel!.send(Argalert.argString(text!));
                            return channel!.send(Argalert.formatUsers(users), {
                                split: {
                                    char: ' '
                                }
                            }).then((mess: Message | Message[]) => {
                                if (Array.isArray(mess)) {
                                    mess.forEach(innerMess => {
                                        innerMess.delete({
                                            timeout: 500
                                        });
                                    });
                                } else {
                                    mess.delete({
                                        timeout: 500
                                    })
                                }
                            });
                        } else {
                            return msg.reply("You have not permission to trigger the argalert! Required permission: `notify`.");
                        }
                        break;
                    case "embed":
                        return msg.reply("To be implemented.");
                    default:
                        return msg.reply("No such group! This is a bug, please contact @Sqbika#0657");
                }
            } else {
                return msg.reply("Providing and ARG in argalert is mandatory!");
            }
        }
    }

    async helpstring(args: string[]) {
        return `
Possible Commands:

**addme**: Subscribes you to the ARG notification. | Usage: nep argalert addme <argName>
**removeme**: Unsubscribes you from the ARG notification | Usage: nep argalert removeme <argName>
**notify**: Notifies the users in the list about the arg + string (ARGALERT_NOTIFY PERMISSION ONLY) | Usage: nep argalert notify <argName> <string>
**embed**: Creates a RichEmbed message, auto-pins it, people can subscribe to the ARGalert through reacting to it. | Usage: nep argalert embed <argName>
**help**: This. | Usage: nep argalert help

Possible <argName>s: \`${args.join(', ')}\`
`;
    }

    static argString(input: string) {
        return `
༼ つ ◕◕ ༽つ ARG ALERT! ༼ つ ◕◕ ༽つ
A new arg notification has arrived!

\`\`\`
${input}
\`\`\`
༼ つ ◕◕ ༽つ ARG ALERT! ༼ つ ◕◕ ༽つ
`;
    }

    static formatUsers(users: ArgalertUsers[]): string {
        return users.map((user: ArgalertUsers) => {
            return "<@!" + user.user!.DiscID + ">";
        }).join(' ');
    }
}