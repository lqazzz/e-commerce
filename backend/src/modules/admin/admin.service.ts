import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../auth/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateAdminProductDto } from '../products/dto/update-admin-product.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getCustomerList() {
    const customers = await this.customerRepository.find({
      order: { createdAt: 'DESC' },
    });

    return customers.map((customer) => ({
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      role: customer.role,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }));
  }

  async createProduct(dto: CreateProductDto & { product?: Record<string, unknown> }) {
    const nestedProduct = dto.product;

    const name = this.normalizeText(
      this.pickFirstValue(dto.name, dto.productName, dto.title, nestedProduct?.name),
      '',
    );
    const category = this.normalizeText(
      this.pickFirstValue(dto.category, dto.categoryName, nestedProduct?.category),
      '',
    );
    const price = this.normalizeNumber(
      this.pickFirstValue(dto.price, nestedProduct?.price),
      Number.NaN,
    );

    if (!name) {
      throw new BadRequestException('Product name is required');
    }

    if (!category) {
      throw new BadRequestException('Category is required');
    }

    if (!Number.isFinite(price)) {
      throw new BadRequestException('Price is required');
    }

    const product = this.productRepository.create({
      name,
      category,
      price: Math.max(0, price),
      originalPrice: this.normalizeNullableNumber(
        this.pickFirstValue(dto.originalPrice, nestedProduct?.originalPrice),
      ),
      description: this.normalizeText(
        this.pickFirstValue(dto.description, nestedProduct?.description),
        'No description',
      ),
      image: this.normalizeText(
        this.pickFirstValue(dto.image, nestedProduct?.image),
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      ),
      inStock: this.normalizeBoolean(
        this.pickFirstValue(dto.inStock, nestedProduct?.inStock),
        true,
      ),
    });

    const savedProduct = await this.productRepository.save(product);

    return this.toProductView(savedProduct);
  }

  async getProductList() {
    const products = await this.productRepository.find({
      order: { createdAt: 'DESC' },
    });

    return products.map((product) => this.toProductView(product));
  }

  async updateProduct(id: number, dto: UpdateAdminProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (dto.name !== undefined) {
      product.name = this.normalizeText(dto.name, product.name);
    }

    if (dto.category !== undefined) {
      product.category = this.normalizeText(dto.category, product.category);
    }

    if (dto.price !== undefined) {
      product.price = this.normalizeNumber(dto.price, product.price);
    }

    if (dto.originalPrice !== undefined) {
      product.originalPrice = this.normalizeNullableNumber(dto.originalPrice);
    }

    if (dto.description !== undefined) {
      product.description = this.normalizeText(dto.description, product.description);
    }

    if (dto.image !== undefined) {
      product.image = this.normalizeText(dto.image, product.image);
    }

    if (dto.inStock !== undefined) {
      product.inStock = this.normalizeBoolean(dto.inStock, product.inStock);
    }

    const savedProduct = await this.productRepository.save(product);

    return this.toProductView(savedProduct);
  }

  async deleteProduct(id: number) {
    const deleteResult = await this.productRepository.delete({ id });

    if (!deleteResult.affected) {
      throw new NotFoundException('Product not found');
    }

    return { deleted: true };
  }

  private toProductView(product: Product) {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.description,
      image: product.image,
      inStock: product.inStock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  private normalizeText(value: unknown, fallback: string): string {
    if (value === undefined || value === null) {
      return fallback;
    }

    const text = String(value).trim();
    return text || fallback;
  }

  private normalizeNumber(value: unknown, fallback: number): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  private normalizeNullableNumber(value: unknown): number | null {
    if (value === undefined || value === null || value === '') {
      return null;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private normalizeBoolean(value: unknown, fallback: boolean): boolean {
    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'string') {
      const normalized = value.toLowerCase().trim();

      if (normalized === 'true') {
        return true;
      }

      if (normalized === 'false') {
        return false;
      }
    }

    return fallback;
  }

  private pickFirstValue(...values: unknown[]): unknown {
    for (const value of values) {
      if (value === undefined || value === null) {
        continue;
      }

      if (typeof value === 'string' && value.trim() === '') {
        continue;
      }

      return value;
    }

    return undefined;
  }
}
