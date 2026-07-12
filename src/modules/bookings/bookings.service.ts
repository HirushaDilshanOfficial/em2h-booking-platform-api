import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number | null, createBookingDto: CreateBookingDto) {

    const service = await this.prisma.service.findUnique({
      where: { id: createBookingDto.serviceId }
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${createBookingDto.serviceId} not found`);
    }

    if (!service.isActive) {
      throw new BadRequestException(`Service is currently not active`);
    }


    const bookingDate = new Date(createBookingDto.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookingDate < today) {
      throw new BadRequestException('Booking dates cannot be in the past');
    }

    return this.prisma.booking.create({
      data: {
        ...createBookingDto,
        userId: userId,
      },
      include: {
        service: true,
      }
    });
  }

  async findAll(user: any, search?: string, status?: string) {
    const whereClause: any = {};


    if (status) {

      whereClause.status = status as any;
    }


    if (search) {
      whereClause.OR = [
        { customerName: { contains: search, mode: 'insensitive' } },
        { customerEmail: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (user.role === Role.ADMIN) {

      return this.prisma.booking.findMany({
        where: whereClause,
        include: {
          service: true,
          user: {
            select: { id: true, name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {

      whereClause.userId = user.userId;
      return this.prisma.booking.findMany({
        where: whereClause,
        include: {
          service: true,
        },
        orderBy: { createdAt: 'desc' }
      });
    }
  }

  async findOne(id: number, user: any) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }


    if (user.role !== Role.ADMIN && booking.userId !== user.userId) {
      throw new ForbiddenException(`You are not allowed to view this booking`);
    }

    return booking;
  }

  async updateStatus(id: number, updateBookingStatusDto: UpdateBookingStatusDto, user: any) {
    const booking = await this.findOne(id, user);


    if (booking.status === 'CANCELLED' && updateBookingStatusDto.status === 'COMPLETED') {
      throw new BadRequestException('Cancelled bookings cannot be marked as completed.');
    }

    if (user.role !== Role.ADMIN && updateBookingStatusDto.status !== 'CANCELLED') {
      throw new ForbiddenException(`Users can only cancel bookings`);
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: updateBookingStatusDto.status },
      include: { service: true }
    });
  }

  async remove(id: number, user: any) {
    const booking = await this.findOne(id, user);

    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Booking is already cancelled');
    }


    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: { service: true }
    });
  }
}
