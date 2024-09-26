'use client';

import { useEffect, useState } from 'react';
import ProductCard from "@/app/components/ui/composites/product_card";
import { ProductModel } from "@/app/components/model/product_model";
import { container } from '@/app/lib/container';
import { ProductController } from '@/app/controller/product-controller';



export default function ProductCatalog() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  useEffect(() => {
    const productController = container.get<ProductController>(ProductController);
    productController.getProducts().then(setProducts);
  }, []);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}