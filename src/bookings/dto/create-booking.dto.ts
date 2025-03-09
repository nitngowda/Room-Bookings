import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  roomId: number;

  @IsNotEmpty()
  @IsDateString() 
  startTime: Date;

  @IsNotEmpty()
  @IsDateString() 
  endTime: Date;
}
