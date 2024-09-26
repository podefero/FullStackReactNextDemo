import { list } from '@vercel/blob';
import { ProductModel } from '@/app/components/model/product_model';
import { BaseRepository } from './base-repository';
import { injectable } from 'inversify';

@injectable()
export class ProductRepository extends BaseRepository {
  async getProductCatalog(): Promise<ProductModel[]> {
        
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    const productBlob = blobs.find(blob => blob.pathname === 'product.json');
    
    if (!productBlob) {
      throw new Error('Product catalog file not found');
    }

    const productResponse = await fetch(productBlob.url);
    if (!productResponse.ok) {
      throw new Error(`Failed to fetch product data: ${productResponse.statusText}`);
    }

    return await productResponse.json();
  }
}
