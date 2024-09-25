import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentRequestButtonElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { ProductModel } from '../../model/product_model';
import { PaymentRequest } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51Q2LrKRvYUHGl0JWwucyC2zfko1jIYU140FhEFfoAx8c8c3jbvyiGyXARWPflwkk142OUPMwE5SwUrzCRPpS6a4i00tl5Jjeyj");

interface ExpressCheckoutProps {
  amount: number;
  items: ProductModel[]; // Replace 'any' with your actual item type
}

const ExpressCheckoutContent: React.FC<ExpressCheckoutProps> = ({ amount, items }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Total',
        amount: Math.round(amount * 100), // Convert to cents
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
      }
      setIsLoading(false);
    });

    pr.on('paymentmethod', async (e) => {
      // Here you would typically create a payment intent on your server
      // and then confirm the payment on the client side
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const { clientSecret } = await response.json();

      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: e.paymentMethod.id },
        { handleActions: false }
      );

      if (confirmError) {
        e.complete('fail');
      } else {
        e.complete('success');
        // Redirect to success page or update UI
        window.location.href = '/order-confirmation';
      }
    });
  }, [stripe, elements, amount, items]);

  if (isLoading) {
    return <div>Loading payment options...</div>;
  }

  if (!paymentRequest) {
    return <div>Express checkout is not available. Please use the standard checkout option.</div>;
  }

  return <PaymentRequestButtonElement options={{ paymentRequest }} />;
};

const ExpressCheckout: React.FC<ExpressCheckoutProps> = (props) => (
  <Elements stripe={stripePromise}>
    <ExpressCheckoutContent {...props} />
  </Elements>
);

export default ExpressCheckout;