import { Repository } from 'typeorm';
import { Customer } from '../auth/entities/customer.entity';
export declare class AdminService {
    private readonly customerRepository;
    constructor(customerRepository: Repository<Customer>);
    getCustomerList(): Promise<{
        id: number;
        fullName: string;
        email: string;
        role: import("../auth/entities/customer.entity").CustomerRole;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
