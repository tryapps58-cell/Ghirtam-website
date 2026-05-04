import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductVariant } from '../products';

export interface CartItem {
  id: string; // unique cart item id (e.g., productSlug-variantSku)
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, variant, quantity) => {
        set((state) => {
          const itemId = `${product.slug}-${variant.sku}`;
          const existingItemIndex = state.items.findIndex(item => item.id === itemId);

          if (existingItemIndex >= 0) {
            // Update quantity if item already exists
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            // Add new item
            return {
              items: [...state.items, { id: itemId, product, variant, quantity }]
            };
          }
        });
      },

      removeFromCart: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId)
        }));
      },

      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => 
            item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'ghritam-cart-storage', // name of the item in the storage (must be unique)
    }
  )
);
