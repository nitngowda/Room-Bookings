import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async onModuleInit() {
    await this.seedSuperAdmin();
  }

  private async seedSuperAdmin() {
    const superAdminEmail = 'superadmin@example.com';
    const superAdminPassword = 'admin123'; // Change this in production!

    const existingSuperAdmin = await this.findOneByEmail(superAdminEmail);
    if (existingSuperAdmin) {
      this.logger.log('SuperAdmin already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

    // ✅ Correct way to create a user
    await this.userModel.create<User>({
      name: 'SuperAdmin',
      email: superAdminEmail,
      password: hashedPassword,
      role: 'superadmin',
    } as Partial<User>);

    this.logger.log('SuperAdmin user created successfully.');
  }
}
