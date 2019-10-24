import {Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
import {ArgalertUsers} from "./ArgalertUsers";
import {UserNotifyBlacklist} from "./UserNotifyBlacklist";
import {UserNotifyPins} from "./UserNotifyPins";
import {UserNotifyWords} from "./UserNotifyWords";
import {UserPermission} from "./UserPermission";
import {UserRoles} from "./UserRoles";
import {NeptuneModel} from "./Base/NeptuneModel";

@Table({
    tableName: 'user'
})
export class User extends NeptuneModel<User> {

    @Column
    DiscID!: string;

    @Column
    guild!:string;

    @HasMany(() => ArgalertUsers)
    argalerts?: ArgalertUsers[];

    @HasMany(() => UserNotifyBlacklist, 'userId')
    userNotifyBlacklist?: UserNotifyBlacklist[];

    @HasMany(() => UserNotifyBlacklist, 'targetId')
    userNotifyBlacklistTargets?: UserNotifyBlacklist[];

    @HasMany(() => UserNotifyPins)
    userNotifyPins?:UserNotifyPins[];

    @HasMany(() => UserNotifyWords)
    userNotifyWords?:UserNotifyWords[];

    @HasMany(() => UserPermission)
    userPermissions?:UserPermission[];

    @HasMany(() => UserRoles)
    userRoles?:UserRoles[];

    public hasPermission(perm:string):boolean {
        return (this.userPermissions != null && this.userPermissions.some(ur => ur.isPermission(perm))) ||
            (this.userRoles != null && this.userRoles.some(ur => {
                return ur.role != null && ur.role.hasPermission(perm);
            }));
    }

    public hasArgalert(argId:number):boolean {
        if (this.argalerts) {
            return this.argalerts.some((argalert:ArgalertUsers) => {
                return argalert.argId == argId;
            })
        } else {
            return false;
        }
    }

    public static async findByDiscID(id:string):Promise<User | null> {
        return User.findOne({
            where: {
                DiscID: id,
            }
        });
    }

    public static async forceFind(discId:string, guild:string):Promise<User> {
        let user = await User.findOne({
            where: {
                DiscID: discId,
                guild: guild
            }
        });
        if (user == null) {
            user = await User.create({
                DiscID: discId,
                guild:guild,
            });
        }
        return user;
    }
}
