import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'user_room_booking',
      autoLoadModels: true,
      synchronize: true,
    }),
    RoomsModule,
    UsersModule,
    BookingsModule,
  ],
})
export class AppModule {}

