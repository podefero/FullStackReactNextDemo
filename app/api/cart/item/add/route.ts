// import { NextResponse } from 'next/server';
// import { loadCart, saveCart } from '@/app/lib/utils';
// import { ProductModel } from '@/app/components/model/product_model';

// export async function POST(request: Request): Promise<NextResponse> {
//   try {
//     const product = await request.json();
    
//     const cart = await loadCart();
    
//     if (!cart.items) {
//       cart.items = [];
//     }
    
//     const existingItemIndex = cart.items.findIndex((item: ProductModel) => item.id === product.id);
    
//     if (existingItemIndex > -1) {
//       cart.items[existingItemIndex].cartSize += 1;
//     } else {
//       cart.items.push({ ...product, cartSize: 1 });
//     }
    
//     await saveCart(cart);
    
//     return NextResponse.json(cart);
//   } catch (error) {
//     console.error('Error adding item to cart:', error);
//     return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
//   }
// }