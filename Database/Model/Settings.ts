import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";
import {NeptuneModel} from "./Base/NeptuneModel";

@Table({
    tableName: 'settings'
})
export class Settings extends NeptuneModel<Settings> {

    @Column
    key!:string;

    @Column
    value!:string;
}
