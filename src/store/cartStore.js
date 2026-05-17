import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const lineKey = (productId, color, size) => `${productId}::${color}::${size}`;

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, { color, size, qty = 1 } = {}) =>
        set((state) => {
          const key = lineKey(product.id, color, size);
          const existing = state.items.find((it) => it.key === key);
          if (existing) {
            return {
              items: state.items.map((it) =>
                it.key === key ? { ...it, qty: it.qty + qty } : it
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                key,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images?.[0]?.src,
                color,
                size,
                qty,
              },
            ],
          };
        }),

      updateQty: (key, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((it) => it.key !== key)
              : state.items.map((it) => (it.key === key ? { ...it, qty } : it)),
        })),

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((it) => it.key !== key) })),

      clear: () => set({ items: [] }),

      get count() {
        return get().items.reduce((acc, it) => acc + it.qty, 0);
      },
      get subtotal() {
        return get().items.reduce((acc, it) => acc + it.price * it.qty, 0);
      },
    }),
    { name: 'garabato-cart' }
  )
);

export const useCartCount = () =>
  useCartStore((s) => s.items.reduce((acc, it) => acc + it.qty, 0));

export const useCartSubtotal = () =>
  useCartStore((s) => s.items.reduce((acc, it) => acc + it.price * it.qty, 0));
