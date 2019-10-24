import {BelongsTo, Column, Default, ForeignKey, Model, PrimaryKey} from "sequelize-typescript";
import {User} from "./User";
import {NeptuneModel} from "./Base/NeptuneModel";
import {Table} from "sequelize-typescript/dist/model/table/table";

@Table({
    tableName: "user_notify_words"
})
export class UserNotifyWords extends NeptuneModel<UserNotifyWords> {

    @ForeignKey(() => User)
    @Column
    userId!:number;

    @BelongsTo(() => User)
    user?:User;

    @Column
    word!:string;

    @Column
    channel!:string;

    @Default(true)
    @Column
    enabled!:boolean;
}
