import { NextResponse } from 'next/server';
import { ProductService } from '@/app/service/product-service';
import { container } from '@/app/lib/container';

export const revalidate = 3600; // Revalidate every hour

export async function GET(): Promise<NextResponse> {
  try {
    const service = container.get(ProductService);
    const productData = await service.getProducts();

    return NextResponse.json(productData);
  } catch (error) {
    console.error('Error fetching product catalog:', error);
    return NextResponse.json({ error: 'Failed to fetch product catalog' }, { status: 500 });
  }
}