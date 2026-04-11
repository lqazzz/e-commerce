import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../auth/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';

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

  async createProduct(dto: CreateProductDto) {
    const product = this.productRepository.create({
      name: dto.name.trim(),
      category: dto.category.trim(),
      price: dto.price,
      originalPrice: dto.originalPrice ?? null,
      description: dto.description.trim(),
      image: dto.image.trim(),
      inStock: dto.inStock ?? true,
    });

    const savedProduct = await this.productRepository.save(product);

    return {
      id: savedProduct.id,
      name: savedProduct.name,
      category: savedProduct.category,
      price: savedProduct.price,
      originalPrice: savedProduct.originalPrice,
      description: savedProduct.description,
      image: savedProduct.image,
      inStock: savedProduct.inStock,
      createdAt: savedProduct.createdAt,
      updatedAt: savedProduct.updatedAt,
    };
  }
}
