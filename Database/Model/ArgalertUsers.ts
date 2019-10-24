import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {User} from "./User";
import {Arg} from "./Arg";
import {NeptuneModel} from "./Base/NeptuneModel";

@Table({
    tableName: 'argalert_users'
})
export class ArgalertUsers extends NeptuneModel<ArgalertUsers> {


    @ForeignKey(() => User)
    @Column
    userId!:number;

    @BelongsTo(() => User)
    user?:User;

    @ForeignKey(() => Arg)
    @Column
    argId!:number;

    @BelongsTo(() => Arg)
    arg?:Arg

    public static async existsByUserAndArg(user:number|User, arg:number|Arg):Promise<boolean> {
        let argalert = await ArgalertUsers.findOne({
            where: {
                userId: (typeof user == "number" ? <number>user : <number>user.ID),
                argId: (typeof arg == "number" ? <number>arg : <number>arg.ID)
            }
        });
        return argalert != null;
    }

    public static async findAllByArg(arg:number|Arg):Promise<ArgalertUsers[]> {
        return ArgalertUsers.findAll({
            where: {
                argId: (typeof arg == "number" ? <number>arg : <number>arg.ID),
            }
        });
    }
}
