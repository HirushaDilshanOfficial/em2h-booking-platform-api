import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsInt, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @IsInt()
  @IsNotEmpty()
  serviceId: number;

  @IsString()
  @IsNotEmpty()
  bookingDate: string;

  @IsString()
  @IsNotEmpty()
  bookingTime: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
