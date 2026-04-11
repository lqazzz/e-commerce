import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../auth/entities/customer.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getCustomerList() {
    const customers = await this.customerRepository.find({
      order: { createdAt: 'DESC' },
    });

    return customers.map((customer) => ({
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      role: customer.role,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }));
  }
}
