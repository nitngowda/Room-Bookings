import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Room } from '../rooms/room.model';
import { User } from '../users/users.model';
import { Op } from 'sequelize';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking) private bookingModel: typeof Booking) {}

  // ✅ Create a Booking with Conflict Check
  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { roomId, userId, startTime, endTime } = createBookingDto;

    // 🔹 Check if Room Exists
    const room = await Room.findByPk(roomId);
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    // 🔹 Validate Booking Time
    if (new Date(startTime) >= new Date(endTime)) {
      throw new BadRequestException('End time must be after start time');
    }

    // 🔹 Check if User Exists
    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // 🔹 Check for Booking Conflicts (Fix: Use Sequelize Operators)
    const conflict = await this.bookingModel.findOne({
      where: {
        roomId,
        [Op.or]: [
          { startTime: { [Op.between]: [startTime, endTime] } },
          { endTime: { [Op.between]: [startTime, endTime] } },
          {
            [Op.and]: [
              { startTime: { [Op.lte]: startTime } },
              { endTime: { [Op.gte]: endTime } },
            ],
          },
        ],
      },
    });

    if (conflict) {
      throw new BadRequestException('Room is already booked during this time');
    }

    // ✅ Fix: Explicitly pass only necessary fields
    return this.bookingModel.create({
      roomId,
      userId,
      startTime,
      endTime,
    } as Booking);
  }

  // ✅ Get All Bookings
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingModel.findAll({ include: [Room, User] });
  }

  // ✅ Get Booking by ID
  async getBookingById(id: number): Promise<Booking> {
    const booking = await this.bookingModel.findByPk(id, { include: [Room, User] });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  // ✅ Delete a Booking (Fixed)
  async deleteBooking(id: number): Promise<{ message: string }> {
    const booking = await this.getBookingById(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    await booking.destroy();
    return { message: `Booking with ID ${id} deleted successfully` };
  }
}
