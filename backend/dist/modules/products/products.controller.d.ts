import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(): Promise<{
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
}
