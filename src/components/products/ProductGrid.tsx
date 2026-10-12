import { ProductCard } from './ProductCard'
import type { Product } from '../../types'

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
}

export function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns]

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="font-serif text-2xl text-warmBrown-300 italic">
          No pieces found
        </p>
        <p className="text-sm font-sans text-warmBrown-300">
          Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid ${colClass} gap-x-5 gap-y-10`} role="list" aria-label="Products">
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
