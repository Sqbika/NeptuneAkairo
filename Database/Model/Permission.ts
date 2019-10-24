import {Column, Model, PrimaryKey} from "sequelize-typescript";
import {HasMany} from "sequelize-typescript/dist/associations/has/has-many";
import {UserPermission} from "./UserPermission";
import {RolePermission} from "./RolePermission";
import {NeptuneModel} from "./Base/NeptuneModel";
import {Table} from "sequelize-typescript/dist/model/table/table";

@Table({
    tableName: 'permission'
})
export class Permission extends NeptuneModel<Permission> {

    @Column
    code!:string;

    @HasMany(() => UserPermission)
    users?:UserPermission[];

    @HasMany(() => RolePermission)
    roles?:RolePermission[];

    public static findByCode(code:string):Promise<Permission|null> {
        return Permission.findOne({
            where: {
                code: code
            }
        })
    }
}
