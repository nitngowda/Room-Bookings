import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './room.model';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';

@Module({
  imports: [SequelizeModule.forFeature([Room])], // Register Room model
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [SequelizeModule], 
})
export class RoomsModule {}
