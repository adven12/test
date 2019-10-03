import { Table, Column, Model, DataType, ForeignKey, BelongsToMany, BelongsTo } from 'sequelize-typescript';


@Table
export class Users_roles extends Model<Users_roles> {

  @ForeignKey(() => Users)
  @Column
  users_id: Number;

  @ForeignKey(() => Roles)
  @Column
  roles_id: Number;
}


@Table
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: '_id',
  })
  _id: Number;

  @Column
  firstName: String;

  @Column
  password: String;

  @Column
  username: String;

  @Column
  avatar: String;


  @BelongsToMany(() => Roles, () => Users_roles)
  roleId: Users_roles[];

}

@Table
export class Roles extends Model<Roles> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: '_id',
  })
  id: Number;

  @Column
  roleName: String


  @BelongsToMany(() => Users, () => Users_roles)
  datarole: Users[];
}

