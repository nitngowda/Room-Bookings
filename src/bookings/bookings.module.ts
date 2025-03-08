import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';
import { User } from '../users/users.model'; // ✅ Added
import { Room } from '../rooms/room.model'; // ✅ Added

@Module({
  imports: [SequelizeModule.forFeature([Booking, User, Room])], // ✅ Added models
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
