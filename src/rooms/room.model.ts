import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Rooms' })
export class Room extends Model<Room> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // ✅ Enforce unique room names
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { min: 1 }, // ✅ Capacity must be at least 1
  })
  capacity: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true, // ✅ Default: Room is available
  })
  availability: boolean;
}
