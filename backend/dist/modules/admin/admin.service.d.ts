import { Repository } from 'typeorm';
import { Customer } from '../auth/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';
export declare class AdminService {
    private readonly customerRepository;
    private readonly productRepository;
    constructor(customerRepository: Repository<Customer>, productRepository: Repository<Product>);
    getCustomerList(): Promise<{
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
