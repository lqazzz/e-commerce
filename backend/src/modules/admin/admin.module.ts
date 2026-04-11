import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../auth/entities/customer.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
