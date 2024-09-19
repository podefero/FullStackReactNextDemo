'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { ProductModel } from "@/components/model/product_model";

interface CartProps {
  itemCount: number;
  products: ProductModel[]; // Array of ProductModel
}

const Cart: React.FC<CartProps> = ({ itemCount, products }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter()

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push('/cart')}
    >
        
      {/* Cart Icon/Count */}
      <div className="fixed top-4 right-4 bg-gray-800 text-white p-3 rounded-lg cursor-pointer">
        <h3 className="text-lg font-semibold">Cart ({itemCount})</h3>
      </div>

      {/* Dropdown list of products on hover */}
      {isHovered && (
        <div className="absolute right-0 mt-16 bg-white shadow-lg rounded-lg w-64">
          <ul className="py-2">
            {products.length > 0 ? (
              products.map((product, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-200 flex items-center space-x-4"
                >
                  <img
                    src={product.img}
                    alt={product.productName}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-md font-medium">
                      {product.productName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      ${product.productPrice}
                    </p>
                  </div>
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
