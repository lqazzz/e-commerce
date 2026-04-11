import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Customer } from './entities/customer.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev_customer_jwt_secret',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AdminGuard],
  exports: [AuthService],
})
export class AuthModule {}
