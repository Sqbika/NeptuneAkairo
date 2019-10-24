import {ArgumentGenerator, ArgumentOptions, Command, MissingPermissionSupplier} from "discord-akairo";
import {PERMISSION} from "./Enum/PERMISSION";
import {NeptuneCommandOptions} from "./Types/NeptuneCommandOptions";
import {Message} from "discord.js";

export class NeptuneCommand extends Command {

    public permission?: PERMISSION | PERMISSION[] | string;
    public usage?:string;
    public description:string|string[];
    public args?:ArgumentOptions[]|ArgumentGenerator;
    public enabled:boolean = true;

    public constructor(id: string, options: NeptuneCommandOptions) {
        super(id, options);
        if (this.aliases.indexOf(id) == -1) this.aliases.push(id);
        this.args = options.args;
        this.permission = options.permission;
        this.usage = options.usage;
        this.description = options.description;
    }

    /*userPermissions = this.dbUserPermission;

    public async dbUserPermission(message: Message): Promise<boolean> {
        if (this.permission) {
            //TODO: Make arrays work
            if (message.author) {
                let user = await this.client.database.db.query('SELECT User u FROM public.user ' +
                    'LEFT JOIN user_roles ur ON u.ID = ur.userId ' +
                    'LEFT JOIN role r ON ur.roleId = r.ID ' +
                    'LEFT JOIN role_permission rp ON r.permissionId = rp.ID ' +
                    'LEFT JOIN user_permission up ON u.ID = up.userId ' +
                    'LEFT JOIN permission p1 ON up.permissionId = p1.ID' +
                    'LEFT JOIN permission p2 ON rp.permissionId = p2.ID' +
                    'WHERE u.guild = $1 AND u.DiscID = $3 AND u.DiscID = $2 AND' +
                    'r.guild = $1 AND (' +
                    'p1.code = $2 OR p2.code = $2)', {
                    bind: [message.author.id, this.permission, message.author.id]
                });
                return new Promise<boolean>(() => user != null);
            } else {
                return new Promise<boolean>(() => false);
            }
        } else {
            return new Promise<boolean>(() => true);
        }
    }*/

    public getDescription():string {
        return `
**Description**: ${Array.isArray(this.description) ? this.description.join('\n') : this.description}
**Usage**: ${this.usageString}
**Enabled**: ${this.enabled ? "Yes" : "No"}
**Aliases**: \`${this.aliases.join(', ')}\`
**Category**: \`${this.category}\`
**Restriction**: \`${this.channel ? this.channel == 'guild' ? 'Guild Only' : 'DM Only' : 'None.'}\`
**Arguments**: ${this.argumentString}

 **Cooldown**: ${this.cooldown ? `${this.cooldown} ms` : 'No Cooldown'}
 **Ratelimit**: ${this.cooldown ? `${this.ratelimit} usage per cooldown` : 'Disabled'} 

 **User Permission Required**: ${this.userPermissions ? `Yes: ${typeof this.userPermissions === "function" ? "Function based." : this.userPermissions}` : 'No'}
 **Bot Permission Required**: ${this.clientPermissions ? `Yes: ${typeof this.clientPermissions === "function" ? "Function based." : this.clientPermissions}` : 'No'}
`;
    }

    get usageString():string {
        if (this.usage) {
            return `${this.client.config.prefix} ${this.usage}`;
        } else {
            let base = this.client.config.prefix + " " + this.aliases[0];
            if (this.args) {
                if (Array.isArray(this.args)) {
                    base += this.args.map(ar => "<" + ar.id + ">").join(' ');
                } else {
                    return "This command uses generator function for arguments. If you see this, that means that the usage was not filled.";
                }
            }
            return base + "  (Generated.)";
        }
    }

    get argumentString():string {
        if (this.args) {
            if (typeof this.args === "function") {
                return "This command uses a function to determine it's arguments. Please see usage for more information.";
            } else {
                return this.args.map(ar => `  -**Name**: ${ar.id}
  -**Description**: ${ar.description.description !== undefined ? ar.description.description : 'No Argument Description was Provided. Yell at Developer please!'}
  -**Usage**: ${ar.description.usage !== undefined ? ar.description.usage : 'No Argument Usage was Provided. Yell at Developer please!'}
 `).join('\n')
            }
         } else {
            return "This command has no argument options.";
        }
    }

    public enable() {
        this.enabled = true;
    }

    public disable() {
        this.enabled = false;
    }


}
