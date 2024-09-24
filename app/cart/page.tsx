"use client";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";

const CartDetailPage = () => {
  const { items, loadCart, removeItem } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const totalPrice = items.reduce((sum, item) => sum + item.productPrice, 0);

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <ul>
        {items.length > 0 ? (
          items.map((product) => (
            <li key={product.id} className="mb-4 flex items-center justify-between space-x-4 border-b pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={product.img}
                  alt={product.productName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="text-xl font-semibold">{product.productName}</h4>
                  <p className="text-lg">${product.productPrice.toFixed(2)}</p>
                </div>
              </div>
              <button 
                onClick={() => handleRemoveItem(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No items in cart</li>
        )}
      </ul>
      {items.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</h2>
          <button 
            onClick={handleCheckout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-lg font-semibold transition duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDetailPage;