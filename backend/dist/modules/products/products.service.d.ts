import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
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
    getProductById(id: number): Promise<{
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
    private toProductView;
}
