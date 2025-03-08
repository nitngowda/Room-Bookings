import { IsBoolean, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'Room name is required' })
  name: string;

  @IsInt({ message: 'Capacity must be an integer' })
  @Min(1, { message: 'Capacity must be at least 1' })
  capacity: number;

  @IsBoolean({ message: 'Availability must be a boolean' })
  availability: boolean;
}
