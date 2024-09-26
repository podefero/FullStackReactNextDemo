import { BaseController } from './base-controller';
import { injectable } from 'inversify';

@injectable()
export  class ProductController extends BaseController {
    async getProducts() {
        return this.apiGet('/api/product/catalog');
    }
}