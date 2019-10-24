import {Column, Default, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ArgalertUsers} from "./ArgalertUsers";
import {HasMany} from "sequelize-typescript/dist/associations/has/has-many";
import {NeptuneModel} from "./Base/NeptuneModel";

@Table({
    tableName: 'arg'
})
export class Arg extends NeptuneModel<Arg> {

    @Column
    name!:string;

    @Column
    channel?:string;

    @Column
    wikiurl?:string;

    @Default(true)
    @Column
    active!:boolean;

    @Column
    description?:string;

    @Column
    leavemealone_text?:string;

    @HasMany(() => ArgalertUsers)
    argalerts?:ArgalertUsers[];

    @Column
    guild!:string;

    @Column
    channels?:string[];

    @Default([])
    @Column
    regexes!:string[];

    @Default([])
    @Column
    blacklist!:string[];

    public static async existsByArg(arg:string, guild:string):Promise<boolean> {
        let argObj = await this.findArg(arg, guild);
        return argObj != null;
    }

    public static async fetchAll(guild:string):Promise<Arg[]> {
        return Arg.findAll({
            where: {
                guild: guild
            }
        });
    }

    public static async findArg(argName:string, guild:string):Promise<Arg|null> {
        return await Arg.findOne({
            where: {
                guild: guild,
                name: argName,
            }
        });
    }
}
