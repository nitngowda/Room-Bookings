import { Body, Controller, Delete, Get, Param, Patch, Post, BadRequestException } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.getAllRooms();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomsService.getRoomById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.updateRoom(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roomsService.deleteRoom(id);
  }

  // ✅ NEW API: Check Room Availability
  @Get(':id/availability')
async checkRoomAvailability(@Param('id') id: string) {
  const roomId = parseInt(id, 10);
  if (isNaN(roomId)) {
    throw new BadRequestException('Invalid room ID');
  }

  const result = await this.roomsService.isRoomAvailable(roomId);
  return result;  // ✅ Now it should return `{ id: 1, available: true/false }`
}

  
}
