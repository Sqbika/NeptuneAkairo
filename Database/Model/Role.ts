import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Role as discordRole} from 'discord.js';
import {RolePermission} from "./RolePermission";
import {HasMany} from "sequelize-typescript/dist/associations/has/has-many";
import {UserRoles} from "./UserRoles";
import {NeptuneModel} from "./Base/NeptuneModel";

@Table({
    tableName: 'role'
})
export class Role extends NeptuneModel<Role> {

    @Column
    roleName!:string;

    @Column
    discordRoleId?:string;

    @Column
    guild?:string;

    @HasMany(() => RolePermission)
    permissions?:RolePermission[];

    @HasMany(() => UserRoles)
    users?:UserRoles[];


    public hasPermission(perm:string):boolean {
        return (this.permissions != null && this.permissions.some(ur => ur.isPermission(perm)))
    }

    //region [Region] Functions

    public static createDiscordRole(role:discordRole):Role {
        let result = new Role();
        result.set("discordRoleId", role.id);
        result.set("roleName", role.name);
        result.save();
        return result;
    }

    //endregion
}
