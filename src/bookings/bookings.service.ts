import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { Room } from '../rooms/room.model';
import { User } from '../users/users.model';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking) private bookingModel: typeof Booking,
    @InjectModel(Room) private roomModel: typeof Room,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { roomId, userId, startTime, endTime } = createBookingDto;

    // Check if Room Exists
    const room = await this.roomModel.findByPk(roomId);
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    // Check if User Exists
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Create Booking
    return await this.bookingModel.create({ roomId, userId, startTime, endTime } as Booking);
  }
  async getAllBookings(): Promise<Booking[]> {
    return await this.bookingModel.findAll({ include: [Room, User] });
  }
  
  async deleteBooking(id: number): Promise<void> {
    const booking = await this.bookingModel.findByPk(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    await booking.destroy();
  }

  async getBookingById(id: number): Promise<Booking> {
    const booking = await this.bookingModel.findByPk(id, { 
      include: [Room, User],
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }
}
