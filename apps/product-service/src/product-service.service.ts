import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Product } from './type';

@Injectable()
export class ProductServiceService {
  private products: Product[] = [];

  findOne(id: string) {
    return this.products.find((product) => product.id === id);
  }

  findAll() {
    return this.products;
  }

  create(data: { name: string; price: number }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const product = { id: v4() as string, ...data };
    this.products.push(product);
    return product;
  }
}
