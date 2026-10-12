import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { DEMO_PRODUCTS } from '../data/mockData'
import type { Product, ProductFilters, SortOption, Category } from '../types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((p) => {
    if (!p.is_active) return false
    if (filters.category && p.category !== filters.category) return false
    if (filters.inStock && p.stock <= 0) return false
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false
    if (filters.tags?.length && !filters.tags.some((t) => p.tags.includes(t))) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q) &&
        !p.tags.some((t) => t.includes(q))
      )
        return false
    }
    return true
  })
}

function applySorting(products: Product[], sort: SortOption): Product[] {
  const copy = [...products]
  switch (sort) {
    case 'price_asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'featured':
      return copy.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
    case 'newest':
    default:
      return copy.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
  }
}

// ─── Fetch all products ───────────────────────────────────────────────────────

async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return DEMO_PRODUCTS

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Product[]
}

export function useProducts(
  filters: ProductFilters = {},
  sort: SortOption = 'newest'
) {
  return useQuery({
    queryKey: ['products', filters, sort],
    queryFn: async () => {
      const all = await fetchProducts()
      return applySorting(applyFilters(all, filters), sort)
    },
    staleTime: 1000 * 60 * 5,
  })
}

// ─── Fetch single product by slug ─────────────────────────────────────────────

async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) {
    return DEMO_PRODUCTS.find((p) => p.slug === slug) ?? null
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) return null
  return data as Product
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  })
}

// ─── Featured products ────────────────────────────────────────────────────────

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const all = await fetchProducts()
      return all.filter((p) => p.is_featured && p.is_active).slice(0, 6)
    },
    staleTime: 1000 * 60 * 5,
  })
}

// ─── Products by category ─────────────────────────────────────────────────────

export function useProductsByCategory(category: Category) {
  return useProducts({ category })
}
