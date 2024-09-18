import React from "react";
// import { Button } from "@/components/ui/button";

const Hero = React.forwardRef<HTMLHeadElement>(
  (props, ref) => {
    return (
      <header className="bg-white shadow" ref={ref}>
        <div className="container mx-auto py-8 px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to My Shop
          </h1>
          <p className="mt-2 text-gray-600">
            Discover the best deals on your favorite products!
          </p>
          {/* <Button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md">
            Shop Now
          </Button> */}
        </div>
      </header>
    );
  }
);

Hero.displayName = "Hero";

export { Hero };
