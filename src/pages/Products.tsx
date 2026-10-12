import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SeoHead } from '../components/ui/SeoHead'
import { ProductGrid } from '../components/products/ProductGrid'
import { ProductFiltersBar } from '../components/products/ProductFilters'
import { PageSpinner } from '../components/ui/Spinner'
import { useProducts } from '../hooks/useProducts'
import type { ProductFilters, SortOption } from '../types'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState<SortOption>('newest')
  const [filters, setFilters] = useState<ProductFilters>(() => ({
    search: searchParams.get('search') || undefined,
  }))

  // Sync search param from URL (e.g. from navbar search)
  useEffect(() => {
    const q = searchParams.get('search')
    if (q) setFilters((f) => ({ ...f, search: q }))
  }, [searchParams])

  const { data: products = [], isLoading } = useProducts(filters, sort)

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters)
    // Update URL search param
    if (newFilters.search) {
      setSearchParams({ search: newFilters.search })
    } else {
      setSearchParams({})
    }
  }

  const handleReset = () => {
    setFilters({})
    setSort('newest')
    setSearchParams({})
  }

  return (
    <>
      <SeoHead
        title="Shop All Jewellery"
        description="Browse the full Dainty.muse collection — anti-tarnish rings, necklaces, earrings, bracelets and gift sets."
        keywords="anti-tarnish jewellery, buy jewellery online, gold plated jewellery India"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-2">
            Collection
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-warmBrown-600">
            {filters.search ? `Results for "${filters.search}"` : 'All Jewellery'}
          </h1>
        </div>

        {/* Filters bar */}
        <ProductFiltersBar
          filters={filters}
          sort={sort}
          onFiltersChange={handleFiltersChange}
          onSortChange={setSort}
          onReset={handleReset}
          totalCount={products.length}
        />

        {/* Product grid */}
        <div className="mt-10">
          {isLoading ? (
            <PageSpinner />
          ) : (
            <ProductGrid products={products} columns={4} />
          )}
        </div>
      </div>
    </>
  )
}
