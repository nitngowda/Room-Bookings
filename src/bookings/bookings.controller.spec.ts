import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { getModelToken } from '@nestjs/sequelize';
import { Room } from '../rooms/room.model';
import { User } from '../users/users.model';
import { Booking } from './booking.model';

describe('BookingsController', () => {
  let controller: BookingsController;
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        BookingsService,
        {
          provide: getModelToken(Room), // Mock Room Model
          useValue: {
            findByPk: jest.fn().mockResolvedValue({ id: 1, name: 'Test Room' }),
          },
        },
        {
          provide: getModelToken(User), // Mock User Model
          useValue: {
            findByPk: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com' }),
          },
        },
        {
          provide: getModelToken(Booking), // Mock Booking Model
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1, roomId: 1, userId: 1 }),
            findByPk: jest.fn().mockResolvedValue({ id: 1, roomId: 1, userId: 1 }),
          },
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
