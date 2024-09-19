"use client";
import React, { useEffect, useState } from "react";
import { ProductModel } from "@/components/model/product_model";

const CartDetailPage = () => {
  const [productsInCart, setProductsInCart] = useState<ProductModel[]>([]);

  // Load cart data from local storage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cartProducts");
    if (savedCart) {
      setProductsInCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <ul>
        {productsInCart.length > 0 ? (
          productsInCart.map((product, index) => (
            <li key={index} className="mb-4 flex items-center space-x-4">
              <img
                src={product.img}
                alt={product.productName}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h4 className="text-xl font-semibold">{product.productName}</h4>
                <p className="text-lg">${product.productPrice}</p>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No items in cart</li>
        )}
      </ul>
    </div>
  );
};

export default CartDetailPage;
