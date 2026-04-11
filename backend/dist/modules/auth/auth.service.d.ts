import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
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
export declare class AuthService {
    private readonly customerRepository;
    private readonly jwtService;
    constructor(customerRepository: Repository<Customer>, jwtService: JwtService);
    register(dto: RegisterCustomerDto): Promise<AuthResponse>;
    login(dto: LoginCustomerDto): Promise<AuthResponse>;
    getProfile(customerId: number): Promise<CustomerProfile>;
    updateProfile(customerId: number, dto: UpdateCustomerProfileDto): Promise<CustomerProfile>;
    private createAuthResponse;
    private toCustomerProfile;
}
export {};
