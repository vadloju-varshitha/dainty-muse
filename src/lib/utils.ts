// ─── Currency ─────────────────────────────────────────────────────────────────

/**
 * Format paise to INR display string (e.g. 89900 → ₹899)
 */
export function formatPrice(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(paise / 100)
}

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

export function buildWhatsAppOrderMessage(
  items: { name: string; quantity: number; price: number }[],
  total: number,
  customerName?: string
): string {
  const lines = items.map(
    (i) => `• ${i.name} × ${i.quantity} — ${formatPrice(i.price * i.quantity)}`
  )
  const greeting = customerName ? `Hi, I'm ${customerName}.\n\n` : ''
  return encodeURIComponent(
    `${greeting}I'd like to place an order on Dainty.muse:\n\n${lines.join('\n')}\n\nTotal: ${formatPrice(total)}\n\nPlease confirm availability and share payment details. Thank you!`
  )
}

export function getWhatsAppUrl(message: string): string {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
  return `https://wa.me/${number}?text=${message}`
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export function buildPageTitle(pageTitle?: string): string {
  const store = import.meta.env.VITE_STORE_NAME || 'Dainty.muse'
  return pageTitle ? `${pageTitle} — ${store}` : `${store} — Anti-Tarnish Jewellery`
}

// ─── String ───────────────────────────────────────────────────────────────────

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ─── Date ─────────────────────────────────────────────────────────────────────

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

// ─── Razorpay ─────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any
  }
}

export interface RazorpayOptions {
  key: string
  amount: number      // in paise
  currency: string
  name: string
  description: string
  order_id?: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: { color?: string }
  handler: (response: RazorpayResponse) => void
  modal?: { ondismiss?: () => void }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}

export function openRazorpay(options: RazorpayOptions): void {
  if (typeof window.Razorpay === 'undefined') {
    throw new Error('Razorpay SDK not loaded')
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}
