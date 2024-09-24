"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PaymentIntent } from '@stripe/stripe-js';
import { useCartStore } from '@/app/store/cartStore';
import Link from "next/link";

const OrderConfirmationPage = () => {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  useEffect(() => {
    const clientSecret = searchParams.get('payment_intent_client_secret');
    if (clientSecret) {
      // Fetch the PaymentIntent details from server
      fetch('/api/get-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientSecret }),
      })
        .then(response => response.json())
        .then(data => setPaymentIntent(data.paymentIntent));
    }
  }, [searchParams]);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  if (!paymentIntent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
      <p className="mb-4">Thank you for your order!</p>
      <p className="mb-4">Order ID: {paymentIntent.id}</p>
      <p className="mb-4">Amount: ${(paymentIntent.amount / 100).toFixed(2)}</p>
      {/* Add more order details as needed */}
    </div>
  );
};

export default OrderConfirmationPage;