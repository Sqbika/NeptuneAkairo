import {Column, Model, PrimaryKey} from "sequelize-typescript";
import {NeptuneModel} from "./Base/NeptuneModel";
import {Table} from "sequelize-typescript/dist/model/table/table";

@Table({
    tableName: "guild_settings"
})
export class GuildSettings extends NeptuneModel<GuildSettings> {
    @Column
    key!:string;

    @Column
    value!:string;

    @Column
    guild!:string;
}
