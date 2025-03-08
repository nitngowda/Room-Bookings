import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Room name cannot be empty' })
  name?: string;

  @IsOptional()
  @IsInt({ message: 'Capacity must be an integer' })
  @Min(1, { message: 'Capacity must be at least 1' })
  capacity?: number;

  @IsOptional()
  @IsBoolean({ message: 'Availability must be a boolean' })
  availability?: boolean;
}
