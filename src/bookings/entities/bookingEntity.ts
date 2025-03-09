import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/userentity';
import { Room } from '../../rooms/entities/roomentity';

@Table({ tableName: 'bookings' })
export class Booking extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Room)
  @Column
  roomId: number;

  @Column
  startTime: Date;

  @Column
  endTime: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Room)
  room: Room;
}
