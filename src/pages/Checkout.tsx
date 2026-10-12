import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageCircle, CreditCard, ChevronRight, Lock } from 'lucide-react'
import { SeoHead } from '../components/ui/SeoHead'
import { Input } from '../components/ui/Input'
import { useCartStore } from '../store/cartStore'
import { useCreateOrder } from '../hooks/useOrders'
import {
  formatPrice,
  buildWhatsAppOrderMessage,
  getWhatsAppUrl,
  openRazorpay,
} from '../lib/utils'
import type { ShippingAddress } from '../types'
import toast from 'react-hot-toast'

const SHIPPING_THRESHOLD = 99900
const SHIPPING_COST = 7900

interface FormState {
  name: string
  email: string
  phone: string
  line1: string
  line2: string
  city: string
  state: string
  pincode: string
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pincode: '',
}

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email required'
  if (!form.phone.match(/^\+?[6-9]\d{9}$/)) errors.phone = 'Valid Indian mobile number required'
  if (!form.line1.trim()) errors.line1 = 'Address is required'
  if (!form.city.trim()) errors.city = 'City is required'
  if (!form.state.trim()) errors.state = 'State is required'
  if (!form.pincode.match(/^\d{6}$/)) errors.pincode = 'Valid 6-digit pincode required'
  return errors
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, clearCart } = useCartStore()
  const createOrder = useCreateOrder()
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [processing, setProcessing] = useState(false)

  const sub = subtotal()
  const shipping = sub >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = sub + shipping

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-2xl text-warmBrown-400 mb-4">Your bag is empty</p>
        <Link to="/products" className="text-sm font-sans text-champagne-gold underline">
          Shop our collection
        </Link>
      </div>
    )
  }

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const buildAddress = (): ShippingAddress => ({
    line1: form.line1,
    line2: form.line2 || undefined,
    city: form.city,
    state: form.state,
    pincode: form.pincode,
    country: 'India',
  })

  const buildOrderItems = () =>
    items.map((i) => ({
      product_id: i.product.id,
      product_name: i.product.name,
      product_image: i.product.images[0] ?? '',
      price: i.product.price,
      quantity: i.quantity,
    }))

  // ── WhatsApp checkout ─────────────────────────────────────────────────────

  const handleWhatsApp = () => {
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fill in all required fields')
      return
    }

    const message = buildWhatsAppOrderMessage(
      items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      total,
      form.name
    )

    // Create a pending order record
    createOrder.mutate({
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      shipping_address: buildAddress(),
      items: buildOrderItems(),
      subtotal: sub,
      shipping,
      total,
      status: 'pending',
      payment_method: 'whatsapp',
    })

    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  // ── Razorpay checkout ─────────────────────────────────────────────────────

  const handleRazorpay = async () => {
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fill in all required fields')
      return
    }

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined
    if (!keyId || keyId === 'rzp_test_YOUR_KEY_ID') {
      toast.error('Razorpay is not configured. Use WhatsApp checkout or add your test key.')
      return
    }

    setProcessing(true)

    try {
      openRazorpay({
        key: keyId,
        amount: total,
        currency: 'INR',
        name: 'Dainty.muse',
        description: `Order — ${items.length} item${items.length > 1 ? 's' : ''}`,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: '#C9A96E' },
        handler: async (response) => {
          // Record the order with payment ID
          const order = await createOrder.mutateAsync({
            customer_name: form.name,
            customer_email: form.email,
            customer_phone: form.phone,
            shipping_address: buildAddress(),
            items: buildOrderItems(),
            subtotal: sub,
            shipping,
            total,
            status: 'confirmed',
            payment_method: 'razorpay',
            payment_id: response.razorpay_payment_id,
          })

          clearCart()
          navigate(`/order-confirmation?orderId=${order.id}`)
        },
        modal: {
          ondismiss: () => {
            setProcessing(false)
            toast('Payment cancelled')
          },
        },
      })
    } catch {
      toast.error('Could not load payment gateway. Please try WhatsApp checkout.')
      setProcessing(false)
    }
  }

  return (
    <>
      <SeoHead title="Checkout" noindex />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Checkout steps" className="flex items-center gap-2 text-xs font-sans text-warmBrown-300 mb-10">
          <Link to="/cart" className="hover:text-champagne-gold transition-colors">Cart</Link>
          <ChevronRight size={12} />
          <span className="text-warmBrown-600">Checkout</span>
        </nav>

        <h1 className="font-serif text-4xl text-warmBrown-600 mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Contact */}
            <fieldset>
              <legend className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-4">
                Contact Information
              </legend>
              <div className="flex flex-col gap-4">
                <Input
                  label="Full Name"
                  value={form.name}
                  onChange={set('name')}
                  error={errors.name}
                  autoComplete="name"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    error={errors.email}
                    autoComplete="email"
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    error={errors.phone}
                    autoComplete="tel"
                    hint="WhatsApp order updates will be sent here"
                    required
                  />
                </div>
              </div>
            </fieldset>

            {/* Shipping address */}
            <fieldset>
              <legend className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-4">
                Shipping Address
              </legend>
              <div className="flex flex-col gap-4">
                <Input
                  label="Address Line 1"
                  value={form.line1}
                  onChange={set('line1')}
                  error={errors.line1}
                  autoComplete="address-line1"
                  required
                />
                <Input
                  label="Address Line 2 (optional)"
                  value={form.line2}
                  onChange={set('line2')}
                  autoComplete="address-line2"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    value={form.city}
                    onChange={set('city')}
                    error={errors.city}
                    autoComplete="address-level2"
                    required
                  />
                  <Input
                    label="State"
                    value={form.state}
                    onChange={set('state')}
                    error={errors.state}
                    autoComplete="address-level1"
                    required
                  />
                </div>
                <Input
                  label="Pincode"
                  value={form.pincode}
                  onChange={set('pincode')}
                  error={errors.pincode}
                  autoComplete="postal-code"
                  maxLength={6}
                  required
                />
              </div>
            </fieldset>

            {/* Payment options */}
            <div>
              <p className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-4">
                Complete Your Order
              </p>
              <div className="flex flex-col gap-3">
                {/* Razorpay */}
                <button
                  onClick={handleRazorpay}
                  disabled={processing}
                  className="w-full flex items-center justify-between gap-4 border border-champagne-200 px-5 py-4 hover:border-champagne-gold transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Pay securely with Razorpay"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-champagne-gold" />
                    <div className="text-left">
                      <p className="text-sm font-sans text-warmBrown-600 font-medium">
                        Pay with Card / UPI / Net Banking
                      </p>
                      <p className="text-xs font-sans text-warmBrown-300">
                        Secured by Razorpay (Test Mode)
                      </p>
                    </div>
                  </div>
                  <Lock size={14} className="text-warmBrown-300" />
                </button>

                {/* WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-between gap-4 border border-champagne-200 px-5 py-4 hover:border-green-500 transition-colors group"
                  aria-label="Place order via WhatsApp"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle size={20} className="text-green-600" />
                    <div className="text-left">
                      <p className="text-sm font-sans text-warmBrown-600 font-medium">
                        Order via WhatsApp
                      </p>
                      <p className="text-xs font-sans text-warmBrown-300">
                        We'll confirm your order and share payment details
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <p className="text-xs font-sans text-warmBrown-300 mt-4 text-center">
                By placing an order you agree to our{' '}
                <Link to="/policies/returns" className="underline hover:text-champagne-gold">
                  Returns Policy
                </Link>{' '}
                and{' '}
                <Link to="/policies/privacy" className="underline hover:text-champagne-gold">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-champagne-50 p-6 sticky top-28">
              <h2 className="font-serif text-xl text-warmBrown-600 mb-5">Order Summary</h2>

              <div className="flex flex-col gap-4 mb-5">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-20 object-cover bg-champagne-100"
                      />
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-warmBrown-500 text-white text-[10px] rounded-full flex items-center justify-center font-sans">
                        {quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-sans text-warmBrown-600">{product.name}</p>
                      <p className="text-xs font-sans text-warmBrown-400 mt-0.5">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <p className="text-sm font-sans font-medium text-warmBrown-600">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 text-sm font-sans border-t border-champagne-200 pt-4">
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
                <div className="flex justify-between text-warmBrown-600 font-medium pt-2 border-t border-champagne-200 mt-1">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
