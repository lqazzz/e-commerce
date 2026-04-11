import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
export declare class AdminGuard implements CanActivate {
    private readonly customerRepository;
    constructor(customerRepository: Repository<Customer>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
