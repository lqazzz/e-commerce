import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer, CustomerRole } from '../entities/customer.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { sub?: number; role?: CustomerRole } }>();

    if (request.user?.role === 'admin') {
      return true;
    }

    const customerId = request.user?.sub;

    if (!customerId) {
      throw new ForbiddenException('Admin access required');
    }

    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
      select: ['id', 'role'],
    });

    if (!customer || customer.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }

    if (request.user) {
      request.user.role = 'admin';
    }

    return true;
  }
}
