import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsString()
  @MaxLength(80)
  category: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  originalPrice?: number;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsUrl({ require_tld: false })
  image: string;

  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}
