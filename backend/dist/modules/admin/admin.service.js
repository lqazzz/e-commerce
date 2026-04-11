"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../auth/entities/customer.entity");
const product_entity_1 = require("../products/entities/product.entity");
let AdminService = class AdminService {
    customerRepository;
    productRepository;
    constructor(customerRepository, productRepository) {
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }
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
    async createProduct(dto) {
        const nestedProduct = dto.product;
        const name = this.normalizeText(this.pickFirstValue(dto.name, dto.productName, dto.title, nestedProduct?.name), '');
        const category = this.normalizeText(this.pickFirstValue(dto.category, dto.categoryName, nestedProduct?.category), '');
        const price = this.normalizeNumber(this.pickFirstValue(dto.price, nestedProduct?.price), Number.NaN);
        if (!name) {
            throw new common_1.BadRequestException('Product name is required');
        }
        if (!category) {
            throw new common_1.BadRequestException('Category is required');
        }
        if (!Number.isFinite(price)) {
            throw new common_1.BadRequestException('Price is required');
        }
        const product = this.productRepository.create({
            name,
            category,
            price: Math.max(0, price),
            originalPrice: this.normalizeNullableNumber(this.pickFirstValue(dto.originalPrice, nestedProduct?.originalPrice)),
            description: this.normalizeText(this.pickFirstValue(dto.description, nestedProduct?.description), 'No description'),
            image: this.normalizeText(this.pickFirstValue(dto.image, nestedProduct?.image), 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'),
            inStock: this.normalizeBoolean(this.pickFirstValue(dto.inStock, nestedProduct?.inStock), true),
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
    async updateProduct(id, dto) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
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
    async deleteProduct(id) {
        const deleteResult = await this.productRepository.delete({ id });
        if (!deleteResult.affected) {
            throw new common_1.NotFoundException('Product not found');
        }
        return { deleted: true };
    }
    toProductView(product) {
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
    normalizeText(value, fallback) {
        if (value === undefined || value === null) {
            return fallback;
        }
        const text = String(value).trim();
        return text || fallback;
    }
    normalizeNumber(value, fallback) {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    }
    normalizeNullableNumber(value) {
        if (value === undefined || value === null || value === '') {
            return null;
        }
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }
    normalizeBoolean(value, fallback) {
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
    pickFirstValue(...values) {
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map