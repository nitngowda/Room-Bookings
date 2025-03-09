import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {  
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.getAllBookings();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookingsService.getBookingById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookingsService.deleteBooking(id);
  }
}


