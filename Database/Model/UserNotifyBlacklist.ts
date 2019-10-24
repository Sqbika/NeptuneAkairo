import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {User} from "./User";
import {NeptuneModel} from "./Base/NeptuneModel";

@Table({
    tableName: 'user_notify_blacklist'
})
export class UserNotifyBlacklist extends NeptuneModel<UserNotifyBlacklist> {

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user?: User;

    @ForeignKey(() => User)
    @Column
    targetId!: number;

    @BelongsTo(() => User)
    target?: User;
}
