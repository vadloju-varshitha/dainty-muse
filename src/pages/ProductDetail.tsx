import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Heart, ShoppingBag, Share2, ChevronRight, Shield, RotateCcw } from 'lucide-react'
import { SeoHead } from '../components/ui/SeoHead'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { PageSpinner } from '../components/ui/Spinner'
import { useProduct, useProducts } from '../hooks/useProducts'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { ProductGrid } from '../components/products/ProductGrid'
import { formatPrice } from '../lib/utils'
import toast from 'react-hot-toast'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading } = useProduct(slug ?? '')
  const { data: related = [] } = useProducts({ category: product?.category }, 'featured')
  const addToCart = useCartStore((s) => s.addItem)
  const { isWishlisted, toggle } = useWishlistStore()
  const [selectedImage, setSelectedImage] = useState(0)
  const [qty, setQty] = useState(1)

  if (isLoading) return <PageSpinner />
  if (!product) return <Navigate to="/products" replace />

  const wishlisted = isWishlisted(product.id)
  const relatedProducts = related.filter((p) => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, qty)
    toast.success(`${product.name} added to bag`)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    }
  }

  return (
    <>
      <SeoHead
        title={product.name}
        description={product.description}
        image={product.images[0]}
        keywords={product.tags.join(', ')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-warmBrown-300 mb-8">
          <Link to="/" className="hover:text-champagne-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-champagne-gold transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/category/${product.category}`} className="hover:text-champagne-gold transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-warmBrown-500">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`w-16 h-20 border-2 overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === i
                        ? 'border-champagne-gold'
                        : 'border-transparent hover:border-champagne-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} — view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 aspect-[3/4] bg-champagne-50 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-1">
                {product.category}
              </p>
              <h1 className="font-serif text-4xl text-warmBrown-600 leading-tight mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-serif text-warmBrown-600">
                  {formatPrice(product.price)}
                </span>
                {product.stock === 0 && <Badge variant="gray">Sold Out</Badge>}
                {product.stock > 0 && product.stock <= 5 && (
                  <Badge variant="brown">Only {product.stock} left</Badge>
                )}
              </div>
            </div>

            <p className="text-sm font-sans text-warmBrown-400 leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-sans text-warmBrown-300 border border-champagne-100 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Material & finish */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-champagne-100">
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-warmBrown-300 mb-1">
                  Material
                </p>
                <p className="text-sm font-sans text-warmBrown-500">{product.material}</p>
              </div>
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-warmBrown-300 mb-1">
                  Finish
                </p>
                <p className="text-sm font-sans text-warmBrown-500">{product.finish}</p>
              </div>
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <label className="text-xs font-sans uppercase tracking-widest text-warmBrown-400">
                  Qty
                </label>
                <div className="flex items-center border border-champagne-200">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Decrease quantity"
                    className="px-3 py-2 text-warmBrown-400 hover:text-champagne-gold transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-sm font-sans text-warmBrown-600 min-w-[2rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    aria-label="Increase quantity"
                    className="px-3 py-2 text-warmBrown-400 hover:text-champagne-gold transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-sans text-warmBrown-300">
                  {product.stock} available
                </span>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                variant="primary"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1"
              >
                <ShoppingBag size={16} />
                {product.stock === 0 ? 'Sold Out' : 'Add to Bag'}
              </Button>
              <button
                onClick={() => {
                  toggle(product)
                  toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
                    icon: wishlisted ? '💔' : '🤍',
                  })
                }}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={wishlisted}
                className="flex items-center justify-center gap-2 px-5 py-3.5 border border-champagne-200 text-sm text-warmBrown-400 hover:border-champagne-gold hover:text-champagne-gold transition-all"
              >
                <Heart size={16} className={wishlisted ? 'fill-champagne-gold text-champagne-gold' : ''} />
              </button>
              <button
                onClick={handleShare}
                aria-label="Share product"
                className="flex items-center justify-center gap-2 px-5 py-3.5 border border-champagne-200 text-sm text-warmBrown-400 hover:border-champagne-gold hover:text-champagne-gold transition-all"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Assurance */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-sans text-warmBrown-400">
                <Shield size={14} className="text-champagne-gold flex-shrink-0" />
                Anti-tarnish guaranteed
              </div>
              <div className="flex items-center gap-2 text-xs font-sans text-warmBrown-400">
                <RotateCcw size={14} className="text-champagne-gold flex-shrink-0" />
                7-day returns
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20" aria-label="Related products">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl text-warmBrown-600">You May Also Love</h2>
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}
      </div>
    </>
  )
}
