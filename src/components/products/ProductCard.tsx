import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { formatPrice } from '../../lib/utils'
import { Badge } from '../ui/Badge'
import type { Product } from '../../types'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageIdx, setImageIdx] = useState(0)
  const [imageError, setImageError] = useState(false)
  const addToCart = useCartStore((s) => s.addItem)
  const { isWishlisted, toggle } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (product.stock === 0) return
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggle(product)
    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: wishlisted ? '💔' : '🤍',
    })
  }

  return (
    <article className="group relative flex flex-col">
      <Link
        to={`/products/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="block overflow-hidden"
      >
        {/* Image container */}
        <div className="relative aspect-[3/4] bg-champagne-50 overflow-hidden">
          {!imageError ? (
            <img
              src={product.images[imageIdx] || product.images[0]}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
              onMouseEnter={() => product.images[1] && setImageIdx(1)}
              onMouseLeave={() => setImageIdx(0)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-champagne-300">
              <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_featured && <Badge variant="gold">Featured</Badge>}
            {product.stock === 0 && <Badge variant="gray">Sold Out</Badge>}
            {product.stock > 0 && product.stock <= 5 && (
              <Badge variant="brown">Only {product.stock} left</Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wishlisted}
            className="absolute top-2 right-2 p-2 bg-ivory-100/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-ivory-100"
          >
            <Heart
              size={15}
              className={wishlisted ? 'fill-champagne-gold text-champagne-gold' : 'text-warmBrown-400'}
            />
          </button>

          {/* Quick add to cart */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center gap-2 bg-warmBrown-700/90 backdrop-blur-sm text-ivory-100 py-3 text-xs font-sans uppercase tracking-widest hover:bg-warmBrown-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={14} />
              {product.stock === 0 ? 'Sold Out' : 'Quick Add'}
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="pt-3 pb-1 flex flex-col gap-1">
          <p className="text-xs font-sans uppercase tracking-widest text-champagne-gold">
            {product.category}
          </p>
          <h3 className="text-base font-serif text-warmBrown-600 leading-snug group-hover:text-warmBrown-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-sans text-warmBrown-500 font-medium">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  )
}
