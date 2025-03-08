import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './room.model';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private roomModel: typeof Room) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomModel.create({ ...createRoomDto } as Room);
  }

  async getAllRooms(): Promise<Room[]> {
    return this.roomModel.findAll();
  }

  async getRoomById(id: number): Promise<Room> {
    const room = await this.roomModel.findByPk(id);
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async updateRoom(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.getRoomById(id);
    await room.update(updateRoomDto);
    return room;
  }

  async deleteRoom(id: number): Promise<{ message: string }> {
    const room = await this.getRoomById(id);
    await room.destroy();
    return { message: `Room with ID ${id} deleted successfully` };
  }

  // ✅ NEW METHOD: Check if Room is Available
  async isRoomAvailable(id: number): Promise<{ id: number; available: boolean }> {
    const room = await this.roomModel.findByPk(id, { attributes: ['id', 'availability'] }); // ✅ Fetch only id & availability
    
    console.log("Room Found:", room); // ✅ Debugging log
  
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    
    return { id: room.id, available: room.availability }; // ✅ Explicitly return availability
  }
  
}
