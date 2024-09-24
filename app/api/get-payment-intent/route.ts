import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Q2LrKRvYUHGl0JW3mHXm53U21jmFTMoILu7t2A0Aup4E6raFWkCrP10D8FUZdWYy3hH7XYgRhtu9Z4WvFOJx7xG00E4GL1rJ3', {
    apiVersion: '2024-06-20', 
  });

export async function POST(req: Request) {
  const { clientSecret } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(clientSecret.split('_secret')[0]);
    return NextResponse.json({ paymentIntent });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}