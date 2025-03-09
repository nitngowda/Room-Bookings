import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './users.model';

const mockUser = {
  id: 1,
  username: 'testuser',
  password: 'hashedpassword',
  role: 'user',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findByPk: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by ID', async () => {
    expect(await service.findUserById(1)).toEqual(mockUser);
    expect(model.findByPk).toHaveBeenCalledWith(1);
  });

  it('should create a new user', async () => {
    const createUserDto = { username: 'testuser', password: 'pass123', role: 'user' };
    expect(await service.createUser(createUserDto)).toEqual(mockUser);
    expect(model.create).toHaveBeenCalledWith(createUserDto);
  });
});
