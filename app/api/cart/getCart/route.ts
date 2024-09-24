import { list, put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    try {
      const { blobs } = await list();
      
      // Find the cart JSON file
      let cartBlob = blobs.find(blob => blob.pathname === 'cart.json');
  
      if (!cartBlob) {
        // If cart file doesn't exist, create a new one
        console.log('Cart file not found. Creating a new one.');
        const newCart = { items: [] };
        const putResult = await put('cart.json', JSON.stringify(newCart), { access: 'public' });
        cartBlob = {
          ...putResult,
          size: Buffer.from(JSON.stringify(newCart)).length,
          uploadedAt: new Date(),
        };
      }
  
      return NextResponse.json({ url: cartBlob.url });
    } catch (error) {
      console.error('Error fetching or creating cart:', error);
      return NextResponse.json({ error: 'Failed to fetch or create cart' }, { status: 500 });
    }
  }