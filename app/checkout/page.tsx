"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";
import ExpressCheckout from "../components/ui/composites/express-checkout";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51Q2LrKRvYUHGl0JWwucyC2zfko1jIYU140FhEFfoAx8c8c3jbvyiGyXARWPflwkk142OUPMwE5SwUrzCRPpS6a4i00tl5Jjeyj");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    });

    if (submitError) {
      setError(submitError.message || "An unexpected error occurred.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {processing ? "Processing..." : "Pay now"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { items, loadCart } = useCartStore();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    };

    if (items.length > 0) {
      fetchPaymentIntent();
    }
  }, [items]);

  const totalPrice = items.reduce((sum, item) => sum + item.productPrice, 0);

  return (
    <div className="container mx-auto py-16 px-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Express Checkout</h2>
        <ExpressCheckout amount={totalPrice} items={items} />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Standard Checkout</h2>
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;