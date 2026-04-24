import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  paranoid: true,
  deletedAt: 'destroyedTime',
})
export class User extends Model {
  @Column
  fullName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  password: string;
}
