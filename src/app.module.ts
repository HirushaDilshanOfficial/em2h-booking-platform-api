import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { BookingsModule } from './modules/bookings/bookings.module';

@Module({
  imports: [PrismaModule, UsersModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
