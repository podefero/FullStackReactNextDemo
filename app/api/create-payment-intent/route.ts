import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ProductModel } from '@/app/components/model/product_model'; 

const stripe = new Stripe('sk_test_51Q2LrKRvYUHGl0JW3mHXm53U21jmFTMoILu7t2A0Aup4E6raFWkCrP10D8FUZdWYy3hH7XYgRhtu9Z4WvFOJx7xG00E4GL1rJ3', {
    apiVersion: '2024-06-20', 
  });

export async function POST(req: Request) {
  const { items } = await req.json();

  // Calculate the order amount
  const amount = items.reduce((total: number, item: ProductModel) => total + item.productPrice * 100, 0);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}