import { ProductRepository } from '@/app/repository/product-repository';
import { ProductModel } from '@/app/components/model/product_model';
import { BaseService } from './base-service';
import { injectable } from 'inversify';

@injectable()
export class ProductService extends BaseService {
    private repository: ProductRepository;

  constructor(repository: ProductRepository) {
    super();
    this.repository = repository;
  }

  async getProducts(): Promise<ProductModel[]> {
    return await this.repository.getProductCatalog();
  }
}