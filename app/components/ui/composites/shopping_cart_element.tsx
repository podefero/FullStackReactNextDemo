'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import { useCartStore } from '@/app/store/cartStore';

const Cart: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { items, removeItem } = useCartStore();
  const router = useRouter()

  const itemCount = items.length;

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}      
    >
      {/* Cart Icon/Count */}
      <div onClick={() => router.push('/cart')} className="fixed top-4 right-4 bg-gray-800 text-white p-3 rounded-lg cursor-pointer">
        <h3 className="text-lg font-semibold">Cart ({itemCount})</h3>
      </div>

      {/* Dropdown list of products on hover */}
      {isHovered && (
        <div className="absolute right-0 mt-16 bg-white shadow-lg rounded-lg w-64">
          <ul className="py-2">
            {items.length > 0 ? (
              items.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-200 flex items-center space-x-4"
                >
                  <Image
                    src={item.img}
                    alt={item.productName}
                    width={40}
                    height={40}
                    className="object-cover rounded"
                  />
                  <div>
                    <h4 className="text-md font-medium">
                      {item.productName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      ${item.productPrice} x {item.cartSize}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(item.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No items in cart</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;