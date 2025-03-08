import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  roomId: number;

  @IsNotEmpty()
  @IsDateString() // ✅ Ensures proper date format
  startTime: Date;

  @IsNotEmpty()
  @IsDateString() // ✅ Ensures proper date format
  endTime: Date;
}
