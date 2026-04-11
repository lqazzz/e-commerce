import { IsOptional } from 'class-validator';

export class UpdateAdminProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  price?: number | string;

  @IsOptional()
  originalPrice?: number | string;

  @IsOptional()
  description?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  inStock?: boolean | string;
}
