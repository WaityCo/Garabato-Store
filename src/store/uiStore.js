import { create } from 'zustand';

export const useUIStore = create((set) => ({
  mobileMenuOpen: false,
  cartOpen: false,
  searchOpen: false,
  filtersOpen: false,

  openMobileMenu: () => set({ mobileMenuOpen: true }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),

  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),

  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),

  openFilters: () => set({ filtersOpen: true }),
  closeFilters: () => set({ filtersOpen: false }),
}));
