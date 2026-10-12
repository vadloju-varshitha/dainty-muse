import { useParams, Navigate } from 'react-router-dom'
import { SeoHead } from '../components/ui/SeoHead'
import { ProductGrid } from '../components/products/ProductGrid'
import { PageSpinner } from '../components/ui/Spinner'
import { useProductsByCategory } from '../hooks/useProducts'
import type { Category as CategoryType } from '../types'
import { capitalize } from '../lib/utils'

const VALID_CATEGORIES: CategoryType[] = [
  'rings', 'necklaces', 'earrings', 'bracelets', 'anklets', 'sets',
]

const CATEGORY_DESCRIPTIONS: Record<CategoryType, string> = {
  rings: 'Delicate, stackable rings crafted for everyday wear.',
  necklaces: 'Layered pendants and chains for effortless elegance.',
  earrings: 'From subtle studs to statement drops — all hypoallergenic.',
  bracelets: 'Dainty bangles and cuffs that stack beautifully.',
  anklets: 'Lightweight ankle chains with timeless charm.',
  sets: 'Perfectly matched jewellery sets for gifting or treating yourself.',
}

export default function Category() {
  const { slug } = useParams<{ slug: string }>()
  const category = slug as CategoryType

  if (!VALID_CATEGORIES.includes(category)) {
    return <Navigate to="/products" replace />
  }

  const { data: products = [], isLoading } = useProductsByCategory(category)

  const title = capitalize(category)
  const desc = CATEGORY_DESCRIPTIONS[category]

  return (
    <>
      <SeoHead
        title={title}
        description={`${desc} Shop Dainty.muse ${title.toLowerCase()}.`}
        keywords={`${category} jewellery, anti-tarnish ${category}, gold plated ${category}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category header */}
        <div className="text-center mb-12 py-8 border-b border-champagne-100">
          <p className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-2">
            Category
          </p>
          <h1 className="font-serif text-5xl text-warmBrown-600 mb-3">{title}</h1>
          <p className="text-sm font-sans text-warmBrown-400 max-w-md mx-auto">{desc}</p>
        </div>

        {isLoading ? (
          <PageSpinner />
        ) : (
          <ProductGrid products={products} columns={4} />
        )}
      </div>
    </>
  )
}
