import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Role} from "./Role";
import {Permission} from "./Permission";
import {NeptuneModel} from "./Base/NeptuneModel";

@Table({
    tableName: 'role_permission'
})
export class RolePermission extends NeptuneModel<RolePermission> {

    @ForeignKey(() => Role)
    @Column
    roleId!:number;

    @BelongsTo(() => Role)
    role?:Role;

    @ForeignKey(() => Permission)
    @Column
    permissionId!:number;

    @BelongsTo(() => Permission)
    permission?:Permission;

    public isPermission(perm:string):boolean {
        return this.permission != undefined && this.permission.code.localeCompare(perm) == 0;
    }
}
