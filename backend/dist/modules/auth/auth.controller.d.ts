import { AuthService } from './auth.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterCustomerDto): Promise<{
        accessToken: string;
        customer: {
            id: number;
            email: string;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(dto: LoginCustomerDto): Promise<{
        accessToken: string;
        customer: {
            id: number;
            email: string;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    me(request: {
        user: {
            sub: number;
        };
    }): Promise<{
        id: number;
        email: string;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
