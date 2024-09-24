import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every hour

export async function GET(): Promise<NextResponse> {
  try {
    const { blobs } = await list();
    
    // Find the product JSON file
    const productBlob = blobs.find(blob => blob.pathname === 'product.json');
    
    if (!productBlob) {
      throw new Error('Product catalog file not found');
    }

    // Fetch the content of the product JSON file
    const productResponse = await fetch(productBlob.url);
    if (!productResponse.ok) {
      throw new Error(`Failed to fetch product data: ${productResponse.statusText}`);
    }

    const productData = await productResponse.json();

    return NextResponse.json(productData);
  } catch (error) {
    console.error('Error fetching product catalog:', error);
    return NextResponse.json({ error: 'Failed to fetch product catalog' }, { status: 500 });
  }
}