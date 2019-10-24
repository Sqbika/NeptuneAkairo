import {Column, ForeignKey, Model, PrimaryKey} from "sequelize-typescript";
import {User} from "./User";
import {BelongsTo} from "sequelize-typescript/dist/associations/belongs-to/belongs-to";
import {Permission} from "./Permission";
import {NeptuneModel} from "./Base/NeptuneModel";
import {Table} from "sequelize-typescript/dist/model/table/table";

@Table({
    tableName: "user_permission"
})
export class UserPermission extends NeptuneModel<UserPermission> {
    @ForeignKey(() => User)
    @Column
    userId!:number;

    @BelongsTo(() => User)
    user?:User;

    @ForeignKey(() => Permission)
    @Column
    permissionId!:number;

    @BelongsTo(() => Permission)
    permission?:Permission;

    public isPermission(perm:string):boolean {
        return this.permission != undefined && this.permission.code.localeCompare(perm) == 0;
    }
}
