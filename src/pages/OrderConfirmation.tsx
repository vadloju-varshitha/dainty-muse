import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { SeoHead } from '../components/ui/SeoHead'

export default function OrderConfirmation() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId')

  return (
    <>
      <SeoHead title="Order Confirmed" noindex />
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <CheckCircle
          size={56}
          className="text-champagne-gold mx-auto mb-6"
          aria-hidden
        />
        <h1 className="font-serif text-4xl text-warmBrown-600 mb-3">
          Order Confirmed
        </h1>
        <p className="text-sm font-sans text-warmBrown-400 leading-relaxed mb-2">
          Thank you for your order. We'll send you a confirmation and tracking update via WhatsApp and email.
        </p>
        {orderId && (
          <p className="text-xs font-sans text-warmBrown-300 mb-8">
            Reference: <span className="font-medium text-warmBrown-500">{orderId}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-champagne-gold text-warmBrown-700 px-8 py-3.5 text-xs font-sans uppercase tracking-widest hover:bg-champagne-500 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 border border-champagne-200 text-warmBrown-400 px-8 py-3.5 text-xs font-sans uppercase tracking-widest hover:border-champagne-gold hover:text-champagne-gold transition-all"
          >
            Home
          </Link>
        </div>
      </div>
    </>
  )
}
