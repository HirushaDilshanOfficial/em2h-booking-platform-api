import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/v1/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Request() req: any, @Body() createBookingDto: CreateBookingDto) {




    const userId = req.user?.userId || null;
    return this.bookingsService.create(userId, createBookingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(
    @Request() req: any,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.bookingsService.findAll(req.user, search, status);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.bookingsService.findOne(+id, req.user);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateStatus(@Request() req: any, @Param('id') id: string, @Body() updateBookingStatusDto: UpdateBookingStatusDto) {
    return this.bookingsService.updateStatus(+id, updateBookingStatusDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Request() req: any, @Param('id') id: string) {
    return this.bookingsService.remove(+id, req.user);
  }
}
