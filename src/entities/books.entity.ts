import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Book extends Model<Book> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: '_id',
  })
  _id: Number;
  
  @Column
  name: String;

  @Column
  price: Number;

  @Column
  descript: String;

  @Column
  full_descript: String;
}