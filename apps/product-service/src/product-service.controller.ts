import { Controller } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductServiceService) {}

  @MessagePattern('find_one_product')
  findOne(@Payload() id: string) {
    return this.productServiceService.findOne(id);
  }

  @MessagePattern('find_all_products')
  findAll() {
    return this.productServiceService.findAll();
  }

  @MessagePattern('create_product')
  create(@Payload() data: { name: string; price: number }) {
    return this.productServiceService.create(data);
  }
}
