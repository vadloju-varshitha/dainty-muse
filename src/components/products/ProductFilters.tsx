import { X } from 'lucide-react'
import type { ProductFilters as Filters, SortOption, Category } from '../../types'

interface ProductFiltersProps {
  filters: Filters
  sort: SortOption
  onFiltersChange: (f: Filters) => void
  onSortChange: (s: SortOption) => void
  onReset: () => void
  totalCount: number
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'rings', label: 'Rings' },
  { value: 'necklaces', label: 'Necklaces' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'bracelets', label: 'Bracelets' },
  { value: 'anklets', label: 'Anklets' },
  { value: 'sets', label: 'Sets' },
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 50000 },
  { label: '₹500 – ₹1,000', min: 50000, max: 100000 },
  { label: '₹1,000 – ₹2,000', min: 100000, max: 200000 },
  { label: 'Above ₹2,000', min: 200000, max: undefined },
]

export function ProductFiltersBar({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onReset,
  totalCount,
}: ProductFiltersProps) {
  const hasActiveFilters =
    filters.category ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.inStock

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 border-b border-champagne-100">
      {/* Result count */}
      <span className="text-xs font-sans text-warmBrown-400 mr-auto">
        {totalCount} {totalCount === 1 ? 'piece' : 'pieces'}
      </span>

      {/* Category filter */}
      <div className="relative">
        <select
          value={filters.category || ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              category: (e.target.value as Category) || undefined,
            })
          }
          aria-label="Filter by category"
          className="appearance-none bg-transparent border border-champagne-200 text-xs font-sans uppercase tracking-widest text-warmBrown-500 px-4 py-2 pr-8 focus:outline-none focus:border-champagne-gold cursor-pointer hover:border-champagne-gold transition-colors"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price filter */}
      <div className="relative">
        <select
          value={
            filters.minPrice !== undefined
              ? `${filters.minPrice}-${filters.maxPrice ?? ''}`
              : ''
          }
          onChange={(e) => {
            if (!e.target.value) {
              const { minPrice: _min, maxPrice: _max, ...rest } = filters
              onFiltersChange(rest)
              return
            }
            const [min, max] = e.target.value.split('-')
            onFiltersChange({
              ...filters,
              minPrice: Number(min),
              maxPrice: max ? Number(max) : undefined,
            })
          }}
          aria-label="Filter by price range"
          className="appearance-none bg-transparent border border-champagne-200 text-xs font-sans uppercase tracking-widest text-warmBrown-500 px-4 py-2 pr-8 focus:outline-none focus:border-champagne-gold cursor-pointer hover:border-champagne-gold transition-colors"
        >
          <option value="">All Prices</option>
          {PRICE_RANGES.map((r) => (
            <option key={r.label} value={`${r.min}-${r.max ?? ''}`}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* In stock filter */}
      <label className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-warmBrown-500 cursor-pointer">
        <input
          type="checkbox"
          checked={filters.inStock || false}
          onChange={(e) => onFiltersChange({ ...filters, inStock: e.target.checked || undefined })}
          className="accent-champagne-gold"
        />
        In Stock
      </label>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-sans uppercase tracking-widest text-warmBrown-400 hidden sm:inline">
          Sort:
        </span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Sort products"
          className="appearance-none bg-transparent border border-champagne-200 text-xs font-sans uppercase tracking-widest text-warmBrown-500 px-4 py-2 pr-8 focus:outline-none focus:border-champagne-gold cursor-pointer hover:border-champagne-gold transition-colors"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-sans text-warmBrown-400 hover:text-champagne-gold transition-colors"
        >
          <X size={12} />
          Clear
        </button>
      )}
    </div>
  )
}
