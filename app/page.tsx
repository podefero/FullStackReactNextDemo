import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hero } from "@/components/ui/hero";
import Image from 'next/image';


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
          <Card className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <Image
            src="/products/idea.svg"
            alt="Product 1"
            width={500} // Set the desired width
            height={192} // Set the desired height
            className="w-full h-48 object-cover rounded-lg"
          />
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800">Product 1</h3>
              <p className="mt-2 text-gray-600">$99.99</p>
              <Button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md">
                Add to Cart
              </Button>
            </div>
          </Card>
          
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
