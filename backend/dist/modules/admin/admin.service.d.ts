import { Repository } from 'typeorm';
import { Customer } from '../auth/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateAdminProductDto } from '../products/dto/update-admin-product.dto';
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
    createProduct(dto: CreateProductDto & {
        product?: Record<string, unknown>;
    }): Promise<{
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
    getProductList(): Promise<{
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
    }[]>;
    updateProduct(id: number, dto: UpdateAdminProductDto): Promise<{
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
    deleteProduct(id: number): Promise<{
        deleted: boolean;
    }>;
    private toProductView;
    private normalizeText;
    private normalizeNumber;
    private normalizeNullableNumber;
    private normalizeBoolean;
    private pickFirstValue;
}
