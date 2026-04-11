import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Customer } from './entities/customer.entity';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';

type CustomerProfile = {
  id: number;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
};

type AuthResponse = {
  accessToken: string;
  customer: CustomerProfile;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterCustomerDto): Promise<AuthResponse> {
    const email = dto.email.toLowerCase().trim();
    const existingCustomer = await this.customerRepository.findOne({
      where: { email },
    });

    if (existingCustomer) {
      throw new BadRequestException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const customer = this.customerRepository.create({
      email,
      fullName: dto.fullName.trim(),
      passwordHash,
    });

    const savedCustomer = await this.customerRepository.save(customer);
    return this.createAuthResponse(savedCustomer);
  }

  async login(dto: LoginCustomerDto): Promise<AuthResponse> {
    const email = dto.email.toLowerCase().trim();
    const customer = await this.customerRepository.findOne({
      where: { email },
    });

    if (!customer) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(dto.password, customer.passwordHash);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.createAuthResponse(customer);
  }

  async getProfile(customerId: number): Promise<CustomerProfile> {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return this.toCustomerProfile(customer);
  }

  async updateProfile(
    customerId: number,
    dto: UpdateCustomerProfileDto,
  ): Promise<CustomerProfile> {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const hasNameUpdate = typeof dto.fullName === 'string';
    const hasEmailUpdate = typeof dto.email === 'string';

    if (!hasNameUpdate && !hasEmailUpdate) {
      throw new BadRequestException('No profile fields to update');
    }

    if (hasNameUpdate) {
      customer.fullName = dto.fullName!.trim();
    }

    if (hasEmailUpdate) {
      const nextEmail = dto.email!.toLowerCase().trim();

      if (nextEmail !== customer.email) {
        const existingCustomer = await this.customerRepository.findOne({
          where: { email: nextEmail },
        });

        if (existingCustomer && existingCustomer.id !== customer.id) {
          throw new BadRequestException('Email already exists');
        }
      }

      customer.email = nextEmail;
    }

    const updatedCustomer = await this.customerRepository.save(customer);
    return this.toCustomerProfile(updatedCustomer);
  }

  private async createAuthResponse(customer: Customer): Promise<AuthResponse> {
    const payload = {
      sub: customer.id,
      email: customer.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      customer: this.toCustomerProfile(customer),
    };
  }

  private toCustomerProfile(customer: Customer): CustomerProfile {
    return {
      id: customer.id,
      email: customer.email,
      fullName: customer.fullName,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}
