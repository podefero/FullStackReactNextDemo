// import { NextResponse } from 'next/server';
// import { loadCart, saveCart } from '@/app/lib/utils';
// import { ProductModel } from '@/app/components/model/product_model';

// export async function POST(request: Request): Promise<NextResponse> {
//   try {
//     const { id } = await request.json();
    
//     const cart = await loadCart();
    
//     cart.items = cart.items.filter((item: ProductModel) => item.id !== id);

//     await saveCart(cart);
    
//     return NextResponse.json(cart);
//   } catch (error) {
//     console.error('Error removing item from cart:', error);
//     return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
//   }
// }