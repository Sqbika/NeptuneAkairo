import {Column, CreatedAt, Model, PrimaryKey, UpdatedAt} from "sequelize-typescript";

export class NeptuneModel<T> extends Model<T> {

    @PrimaryKey
    @Column
    ID?: number;

    @CreatedAt
    @Column
    createdAt?: Date;

    @UpdatedAt
    @Column
    updatedAt?: Date;
}
