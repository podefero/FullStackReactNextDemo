'use client'
import { useEffect } from 'react';
import { useCartStore } from '@/app/store/cartStore';

export function CartInitializer() {
  const loadCart = useCartStore(state => state.loadCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return null;
}