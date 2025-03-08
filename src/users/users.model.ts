import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class User extends Model<User, Partial<User>> {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string; 

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string; 

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare role: string;
}
