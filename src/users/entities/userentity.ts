import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Booking } from '../../bookings/entities/bookingEntity';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @HasMany(() => Booking)
  bookings: Booking[];
}
