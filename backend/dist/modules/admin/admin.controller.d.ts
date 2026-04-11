import { AdminService } from './admin.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getCustomers(): Promise<{
        id: number;
        fullName: string;
        email: string;
        role: import("../auth/entities/customer.entity").CustomerRole;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createProduct(dto: CreateProductDto): Promise<{
        id: number;
        name: string;
        category: string;
        price: number;
        originalPrice: number | null;
        description: string;
        image: string;
        inStock: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
