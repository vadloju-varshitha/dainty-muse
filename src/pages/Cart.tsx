import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { SeoHead } from '../components/ui/SeoHead'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../lib/utils'

const SHIPPING_THRESHOLD = 99900 // ₹999 in paise
const SHIPPING_COST = 7900      // ₹79 in paise

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()
  const sub = subtotal()
  const shipping = sub >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = sub + shipping

  if (items.length === 0) {
    return (
      <>
        <SeoHead title="Your Bag" noindex />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <ShoppingBag size={48} className="text-champagne-200 mx-auto mb-6" aria-hidden />
          <h1 className="font-serif text-3xl text-warmBrown-500 mb-3">Your bag is empty</h1>
          <p className="text-sm font-sans text-warmBrown-300 mb-8">
            Discover our anti-tarnish jewellery collection.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center bg-champagne-gold text-warmBrown-700 px-8 py-3.5 text-sm font-sans uppercase tracking-widest hover:bg-champagne-500 transition-all duration-200"
          >
            Shop Now
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <SeoHead title="Your Bag" noindex />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl text-warmBrown-600 mb-10">Your Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Line items */}
          <div className="lg:col-span-2 flex flex-col gap-6" role="list" aria-label="Cart items">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                role="listitem"
                className="flex gap-5 pb-6 border-b border-champagne-100"
              >
                <Link to={`/products/${product.slug}`} tabIndex={-1} aria-hidden>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-32 object-cover bg-champagne-50 flex-shrink-0"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-champagne-gold mb-1">
                      {product.category}
                    </p>
                    <Link
                      to={`/products/${product.slug}`}
                      className="font-serif text-lg text-warmBrown-600 hover:text-champagne-gold transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm font-sans text-warmBrown-400 mt-0.5">
                      {formatPrice(product.price)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    {/* Quantity */}
                    <div className="flex items-center border border-champagne-200">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="px-3 py-1 text-warmBrown-400 hover:text-champagne-gold transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm font-sans text-warmBrown-600 min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(product.id, Math.min(product.stock, quantity + 1))
                        }
                        aria-label={`Increase quantity of ${product.name}`}
                        className="px-3 py-1 text-warmBrown-400 hover:text-champagne-gold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="text-warmBrown-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <p className="font-sans font-medium text-warmBrown-600 text-sm">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-champagne-50 p-6 sticky top-28">
              <h2 className="font-serif text-xl text-warmBrown-600 mb-5">Order Summary</h2>

              <div className="flex flex-col gap-3 text-sm font-sans mb-5">
                <div className="flex justify-between text-warmBrown-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between text-warmBrown-500">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {sub < SHIPPING_THRESHOLD && (
                  <p className="text-xs text-warmBrown-300 mt-1">
                    Add {formatPrice(SHIPPING_THRESHOLD - sub)} more for free shipping
                  </p>
                )}
                <div className="border-t border-champagne-200 pt-3 flex justify-between font-medium text-warmBrown-600">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-champagne-gold text-warmBrown-700 px-6 py-3.5 text-xs font-sans uppercase tracking-widest hover:bg-champagne-500 transition-colors"
              >
                Checkout <ArrowRight size={14} />
              </Link>

              <Link
                to="/products"
                className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-widest text-warmBrown-400 hover:text-champagne-gold transition-colors py-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
