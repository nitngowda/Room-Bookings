import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { getModelToken } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { Room } from '../rooms/room.model';
import { User } from '../users/users.model';
import { NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';

const mockBookingModel = {
  create: jest.fn().mockImplementation((dto: CreateBookingDto) => 
    Promise.resolve({ id: 1, ...dto })
  ),
  findByPk: jest.fn().mockImplementation((id: number) =>
    Promise.resolve(
      id === 1
        ? { id: 1, roomId: 1, userId: 1, startTime: new Date(), endTime: new Date() }
        : null
    )
  ),
};

const mockRoomModel = {
  findByPk: jest.fn().mockImplementation((id: number) =>
    Promise.resolve(id === 1 ? { id: 1, name: 'Room 1' } : null)
  ),
};

const mockUserModel = {
  findByPk: jest.fn().mockImplementation((id: number) =>
    Promise.resolve(id === 1 ? { id: 1, name: 'User 1' } : null)
  ),
};

describe('BookingsService', () => {
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: getModelToken(Booking), useValue: mockBookingModel },
        { provide: getModelToken(Room), useValue: mockRoomModel },
        { provide: getModelToken(User), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a booking if no conflict', async () => {
    const bookingData: CreateBookingDto = {
      roomId: 1,
      userId: 1,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
    };

    const result = await service.createBooking(bookingData);

    expect(result).toEqual({ id: 1, ...bookingData });
    expect(mockRoomModel.findByPk).toHaveBeenCalledWith(bookingData.roomId);
    expect(mockBookingModel.create).toHaveBeenCalledWith(expect.objectContaining(bookingData));
  });

  it('should return a booking by ID', async () => {
    const result = await service.getBookingById(1);
    expect(result).toEqual({ id: 1, roomId: 1, userId: 1, startTime: expect.any(Date), endTime: expect.any(Date) });
    expect(mockBookingModel.findByPk).toHaveBeenCalledWith(1, { include: [Room, User] });
  });

  it('should throw an error if room does not exist', async () => {
    await expect(service.createBooking({ roomId: 999, userId: 1, startTime: new Date(), endTime: new Date() }))
      .rejects.toThrow(NotFoundException);
  });
});
