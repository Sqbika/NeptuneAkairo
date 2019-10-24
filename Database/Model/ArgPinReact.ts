import {NeptuneModel} from "./Base/NeptuneModel";
import {Column, ForeignKey, PrimaryKey} from "sequelize-typescript";
import {Arg} from "./Arg";
import {Table} from "sequelize-typescript/dist/model/table/table";

@Table({
    tableName: "arg_pinreact"
})
export default class ArgPinReact extends NeptuneModel<ArgPinReact> {

    @ForeignKey(() => Arg)
    @Column
    argId!:number;

    @Column
    guild!:number;

    @Column
    channel!:number;

    @Column
    message!:number;
}