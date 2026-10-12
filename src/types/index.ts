// ─── Core domain types ────────────────────────────────────────────────────────

export type Category =
  | 'rings'
  | 'necklaces'
  | 'earrings'
  | 'bracelets'
  | 'anklets'
  | 'sets'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number          // INR paise for Razorpay; display divided by 100
  images: string[]       // URLs
  category: Category
  tags: string[]
  material: string
  finish: string
  stock: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface WishlistItem {
  product: Product
  added_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: ShippingAddress
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: OrderStatus
  payment_method: 'razorpay' | 'whatsapp'
  payment_id?: string
  razorpay_order_id?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  product_image: string
  price: number
  quantity: number
}

export interface ShippingAddress {
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  country: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface StorePolicy {
  id: string
  slug: string
  title: string
  content: string
  updated_at: string
}

export interface SeoMeta {
  title: string
  description: string
  image?: string
  keywords?: string
}

// ─── Filter / sort types ──────────────────────────────────────────────────────

export interface ProductFilters {
  category?: Category
  minPrice?: number
  maxPrice?: number
  tags?: string[]
  search?: string
  inStock?: boolean
}

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'featured'

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string
  email: string
  role: 'admin'
}
