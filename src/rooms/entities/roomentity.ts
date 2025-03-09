import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Booking } from '../../bookings/entities/bookingEntity';

@Table({ tableName: 'rooms' })
export class Room extends Model {
  @Column
  name: string;

  @Column
  capacity: number;

  @HasMany(() => Booking)
  bookings: Booking[];
}
