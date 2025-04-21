// apps/api-gateway/src/dto/product.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Smartphone X',
  })
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  price: number;
}

export class ProductResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the product',
    example: 'Smartphone X',
  })
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  price: number;
}
