import {BelongsTo, Column, ForeignKey, Model, PrimaryKey} from "sequelize-typescript";
import {User} from "./User";
import {Role} from "./Role";
import {NeptuneModel} from "./Base/NeptuneModel";
import {Table} from "sequelize-typescript/dist/model/table/table";

@Table({
    tableName: "user_roles"
})
export class UserRoles extends NeptuneModel<UserRoles> {
    @ForeignKey(() => User)
    @Column
    userId!:number;

    @BelongsTo(() => User)
    user?:User;

    @ForeignKey(() => Role)
    @Column
    roleId!:number;

    @BelongsTo(() => Role)
    role?:Role;
}
