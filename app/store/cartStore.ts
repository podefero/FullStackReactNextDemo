import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductModel } from '../components/model/product_model'; 

interface CartStore {
  items: ProductModel[];
  addItem: (item: ProductModel) => void;
  removeItem: (id: string) => void;
  initializeCart: (items: ProductModel[]) => void;
  loadCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ 
        items: Array.isArray(state.items) ? [...state.items, item] : [item] 
      })),
      removeItem: (id) => set((state) => ({
        items: Array.isArray(state.items) 
          ? state.items.filter((item) => item.id !== id)
          : []
      })),
      initializeCart: (items) => set({ items: Array.isArray(items) ? items : [] }),
      loadCart: () => {
        const savedCart = localStorage.getItem("cart-storage");
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            set({ items: Array.isArray(parsedCart.state.items) ? parsedCart.state.items : [] });
          } catch (error) {
            console.error("Error parsing cart data:", error);
            set({ items: [] });
          }
        }
      },
      clearCart: () => {
        const savedCart = localStorage.getItem("cart-storage");
        if (savedCart) {
          localStorage.removeItem("cart-storage");
        }
        set({ items: [] });
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);