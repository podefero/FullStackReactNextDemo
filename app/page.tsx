"use client"; //to allow events. Keep things simple for demo
//in future use api, hoooks or form submissions to preserve server side rendering

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hero } from "@/components/ui/composites/hero";
import ProductCard from "@/components/ui/composites/product_card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <Hero></Hero>
      {/* Featured Products Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card */}
          <ProductCard
            imageSrc="/products/idea.svg"
            imageAlt="Product 1"
            productName="Product 1"
            productPrice="$99.99"
            onAddToCart={() => console.log("Added to cart")}
          ></ProductCard>
          {/* You can duplicate this product card for more products */}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-gray-800 py-16 text-white text-center">
        <h2 className="text-3xl font-semibold">Subscribe to Our Newsletter</h2>
        <p className="mt-4 text-gray-400">
          Get updates on our latest deals and products.
        </p>
        <form className="mt-6 flex justify-center items-center space-x-2">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-md text-black"
          />
          <Button className="bg-blue-600 px-4 py-2 text-white rounded-md">
            Subscribe
          </Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-gray-400 text-center">
        <p>&copy; 2024 My Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}
