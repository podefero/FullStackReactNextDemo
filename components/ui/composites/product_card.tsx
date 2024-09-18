import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductCardProps {
  imageSrc: string;
  imageAlt: string;
  productName: string;
  productPrice: string;
  onAddToCart: () => void; //stub for add cart button
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ imageSrc, imageAlt, productName, productPrice, onAddToCart }, ref) => {
    return (
      <Card
        ref={ref}
        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={192}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-800">{productName}</h3>
          <p className="mt-2 text-gray-600">{productPrice}</p>
          <Button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
