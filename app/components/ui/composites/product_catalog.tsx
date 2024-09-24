'use client';

import { useEffect, useState } from 'react';
import ProductCard from "@/app/components/ui/composites/product_card";
import { ProductModel } from "@/app/components/model/product_model";

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/product/catalog`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export default function ProductCatalog() {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}