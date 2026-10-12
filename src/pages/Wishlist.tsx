import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingBag } from 'lucide-react'
import { SeoHead } from '../components/ui/SeoHead'
import { useWishlistStore } from '../store/wishlistStore'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../lib/utils'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore()
  const addToCart = useCartStore((s) => s.addItem)

  const handleAddToCart = (product: (typeof items)[0]['product']) => {
    addToCart(product)
    toast.success(`${product.name} added to bag`)
  }

  if (items.length === 0) {
    return (
      <>
        <SeoHead title="Wishlist" noindex />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <Heart size={48} className="text-champagne-200 mx-auto mb-6" aria-hidden />
          <h1 className="font-serif text-3xl text-warmBrown-500 mb-3">Your wishlist is empty</h1>
          <p className="text-sm font-sans text-warmBrown-300 mb-8">
            Save your favourite pieces by clicking the heart icon.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-champagne-gold text-warmBrown-700 px-8 py-3.5 text-xs font-sans uppercase tracking-widest hover:bg-champagne-500 transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <SeoHead title="Wishlist" noindex />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl text-warmBrown-600 mb-10">Wishlist</h1>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          role="list"
          aria-label="Wishlist items"
        >
          {items.map(({ product }) => (
            <article key={product.id} role="listitem" className="flex flex-col group">
              <Link
                to={`/products/${product.slug}`}
                className="block overflow-hidden"
                aria-label={`View ${product.name}`}
              >
                <div className="aspect-[3/4] bg-champagne-50 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pt-3">
                  <p className="text-xs font-sans uppercase tracking-widest text-champagne-gold">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-base text-warmBrown-600 mt-0.5">{product.name}</h3>
                  <p className="text-sm font-sans text-warmBrown-500 mt-0.5">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-champagne-gold text-warmBrown-700 px-3 py-2 text-xs font-sans uppercase tracking-widest hover:bg-champagne-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Add ${product.name} to bag`}
                >
                  <ShoppingBag size={13} />
                  {product.stock === 0 ? 'Sold Out' : 'Add to Bag'}
                </button>
                <button
                  onClick={() => removeItem(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="p-2 border border-champagne-200 text-warmBrown-300 hover:text-red-400 hover:border-red-200 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
