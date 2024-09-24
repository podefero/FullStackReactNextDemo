'use client'
import React from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ProductModel } from "@/app/components/model/product_model";
import Image from "next/image";
import { useCartStore } from '@/app/store/cartStore';


const ProductCard: React.FC<ProductModel> = ({
  productName,
  productPrice,
  img,
  img_alt,
  id,
  description,
}) => {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    const newItem = { productName, productPrice, img, img_alt, description, id, cartSize: 1 };
    addItem(newItem);   
  };

  return (
    <Card className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="relative w-full h-96">
        <Image
          src={img}
          alt={img_alt}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-800">{productName}</h3>
        <p className="mt-2 text-gray-600">Price: ${productPrice}</p>
        <p className="mt-2 text-gray-600">Description: {description}</p>
        <Button
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;