/**
 * DEMO DATA — clearly labelled.
 * This data is used when Supabase is not configured.
 * All products, prices, and descriptions are fictional and for demonstration only.
 */

import type { Product, StorePolicy } from '../types'

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'demo-001',
    name: 'Luna Crescent Ring',
    slug: 'luna-crescent-ring',
    description:
      'A delicate crescent moon ring in 18k gold-plated 925 sterling silver. Anti-tarnish coated for lasting shine. Adjustable band fits sizes 5–9.',
    price: 89900, // ₹899 in paise
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    ],
    category: 'rings',
    tags: ['moon', 'minimalist', 'adjustable', 'bestseller'],
    material: '925 Sterling Silver, 18k Gold Plating',
    finish: 'Anti-tarnish coated',
    stock: 24,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 'demo-002',
    name: 'Starfall Necklace',
    slug: 'starfall-necklace',
    description:
      'Layered constellation pendant necklace with micro-pavé CZ stones. 45cm + 5cm extender. Anti-tarnish plated chain.',
    price: 149900,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
    ],
    category: 'necklaces',
    tags: ['constellation', 'layered', 'cz', 'bestseller'],
    material: '925 Sterling Silver, 18k Gold Plating, CZ',
    finish: 'Anti-tarnish coated',
    stock: 18,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
  },
  {
    id: 'demo-003',
    name: 'Petal Drop Earrings',
    slug: 'petal-drop-earrings',
    description:
      'Lightweight floral drop earrings with matte finish. Hypoallergenic surgical steel posts. Comes in a gift-ready box.',
    price: 79900,
    images: [
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80',
      'https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=600&q=80',
    ],
    category: 'earrings',
    tags: ['floral', 'drop', 'hypoallergenic', 'gift'],
    material: 'Surgical Steel, 18k Gold Plating',
    finish: 'Matte anti-tarnish',
    stock: 30,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-14T00:00:00Z',
    updated_at: '2024-01-14T00:00:00Z',
  },
  {
    id: 'demo-004',
    name: 'Infinity Bangle',
    slug: 'infinity-bangle',
    description:
      'Slim infinity symbol bangle. Stackable design, perfect for layering. One size fits most.',
    price: 119900,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94815f7?w=600&q=80',
    ],
    category: 'bracelets',
    tags: ['infinity', 'stackable', 'minimalist'],
    material: '925 Sterling Silver, 18k Gold Plating',
    finish: 'Anti-tarnish coated',
    stock: 15,
    is_featured: false,
    is_active: true,
    created_at: '2024-01-16T00:00:00Z',
    updated_at: '2024-01-16T00:00:00Z',
  },
  {
    id: 'demo-005',
    name: 'Dew Drop Anklet',
    slug: 'dew-drop-anklet',
    description:
      'Delicate chain anklet with tiny teardrop charm. Adjustable 22–26cm. Waterproof and anti-tarnish.',
    price: 69900,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
      'https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=600&q=80',
    ],
    category: 'anklets',
    tags: ['chain', 'charm', 'waterproof', 'adjustable'],
    material: '925 Sterling Silver, 18k Gold Plating',
    finish: 'Anti-tarnish + waterproof coating',
    stock: 22,
    is_featured: false,
    is_active: true,
    created_at: '2024-01-18T00:00:00Z',
    updated_at: '2024-01-18T00:00:00Z',
  },
  {
    id: 'demo-006',
    name: 'Celestial Set',
    slug: 'celestial-set',
    description:
      'Matching necklace + earrings set with sun and moon motifs. Beautifully packaged. A perfect gift.',
    price: 199900,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
    ],
    category: 'sets',
    tags: ['celestial', 'gift', 'set', 'sun', 'moon', 'bestseller'],
    material: '925 Sterling Silver, 18k Gold Plating, CZ',
    finish: 'Anti-tarnish coated',
    stock: 8,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
  {
    id: 'demo-007',
    name: 'Vine Stacking Ring',
    slug: 'vine-stacking-ring',
    description:
      'Thin vine-textured band ring. Perfect for stacking. Available in sizes 5–10.',
    price: 59900,
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80',
    ],
    category: 'rings',
    tags: ['stacking', 'textured', 'minimalist'],
    material: '925 Sterling Silver, 18k Gold Plating',
    finish: 'Anti-tarnish coated',
    stock: 40,
    is_featured: false,
    is_active: true,
    created_at: '2024-01-22T00:00:00Z',
    updated_at: '2024-01-22T00:00:00Z',
  },
  {
    id: 'demo-008',
    name: 'Pearl Hug Earrings',
    slug: 'pearl-hug-earrings',
    description:
      'Freshwater pearl huggie hoops. Hypoallergenic. 12mm diameter. Classic and timeless.',
    price: 109900,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    ],
    category: 'earrings',
    tags: ['pearl', 'huggie', 'hoop', 'classic'],
    material: 'Freshwater Pearl, 18k Gold Plating',
    finish: 'Anti-tarnish coated',
    stock: 12,
    is_featured: false,
    is_active: true,
    created_at: '2024-01-24T00:00:00Z',
    updated_at: '2024-01-24T00:00:00Z',
  },
]

export const DEMO_POLICIES: StorePolicy[] = [
  {
    id: 'policy-001',
    slug: 'shipping',
    title: 'Shipping Policy',
    content: `## Shipping Policy

We ship across India and select international destinations.

**Domestic Shipping (India)**
- Standard delivery: 5–7 business days — ₹79
- Express delivery: 2–3 business days — ₹149
- Free shipping on orders above ₹999

**International Shipping**
- Available to UAE, UK, USA, Canada, Singapore, and Australia
- Delivery in 10–14 business days
- Shipping charges calculated at checkout

**Order Processing**
All orders are processed within 1–2 business days after payment confirmation. You will receive a tracking link via WhatsApp or email once dispatched.

**Note:** Delivery times may vary during sale periods and public holidays.`,
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'policy-002',
    slug: 'returns',
    title: 'Returns & Exchange Policy',
    content: `## Returns & Exchange Policy

We want you to love every piece from Dainty.muse.

**Return Window**
7 days from the date of delivery.

**Eligible for Return**
- Items in original, unworn condition
- Original packaging intact
- Manufacturing defects

**Not Eligible**
- Worn or used jewellery
- Items without original packaging
- Customised or engraved pieces

**Exchange**
Exchanges are accepted for sizing issues within 7 days. Please WhatsApp us with your order number and photos.

**Refund Process**
Refunds are processed within 5–7 business days to the original payment method after we receive and inspect the item.

To initiate a return, contact us at hello@daintymuse.com or via WhatsApp.`,
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'policy-003',
    slug: 'privacy',
    title: 'Privacy Policy',
    content: `## Privacy Policy

Your privacy matters to us at Dainty.muse.

**Information We Collect**
- Name, email, phone number, and shipping address when you place an order
- Payment information processed securely by Razorpay (we do not store card details)
- Browsing data through analytics (anonymous)

**How We Use Your Information**
- To process and fulfil your orders
- To send order updates and tracking information
- To improve our website and product offerings
- To send marketing communications (only with your consent)

**Data Sharing**
We do not sell or share your personal data with third parties except:
- Shipping partners to deliver your order
- Payment processors (Razorpay) for secure transactions
- Legal obligations

**Your Rights**
You may request access to, correction of, or deletion of your personal data at any time by emailing hello@daintymuse.com.

**Cookies**
We use essential cookies for cart functionality and optional analytics cookies.`,
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'policy-004',
    slug: 'care',
    title: 'Jewellery Care Guide',
    content: `## Jewellery Care Guide

Our pieces are crafted with anti-tarnish coating for lasting beauty. With proper care, they will stay gorgeous for years.

**Daily Care**
- Remove jewellery before swimming, bathing, or exercising
- Apply perfume, lotion, and hairspray before putting on jewellery
- Wipe gently with a soft, lint-free cloth after wearing

**Storage**
- Store in the provided pouch or jewellery box
- Keep pieces separate to avoid scratching
- Avoid humid environments

**Cleaning**
- Use a soft dry cloth — do not use chemical cleaners
- For gentle cleaning, use a slightly damp cloth and dry immediately
- Never use ultrasonic cleaners on plated pieces

**What to Avoid**
- Chlorine and salt water
- Harsh chemicals (bleach, acetone)
- Extreme heat or direct sunlight for prolonged periods

With the right care, your Dainty.muse pieces will remain your forever favourites.`,
    updated_at: '2024-01-01T00:00:00Z',
  },
]
