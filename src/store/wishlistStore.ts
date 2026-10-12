import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WishlistItem, Product } from '../types'

interface WishlistState {
  items: WishlistItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  toggle: (product: Product) => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isWishlisted(product.id)) {
          set({
            items: [
              ...get().items,
              { product, added_at: new Date().toISOString() },
            ],
          })
        }
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.product.id !== productId) }),

      isWishlisted: (productId) =>
        get().items.some((i) => i.product.id === productId),

      toggle: (product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },
    }),
    { name: 'daintymuse-wishlist' }
  )
)
