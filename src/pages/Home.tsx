import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Sparkles, Truck } from 'lucide-react'
import { SeoHead } from '../components/ui/SeoHead'
import { ProductGrid } from '../components/products/ProductGrid'
import { PageSpinner } from '../components/ui/Spinner'
import { useFeaturedProducts } from '../hooks/useProducts'
import type { Category } from '../types'

const CATEGORIES: { slug: Category; label: string; image: string }[] = [
  {
    slug: 'rings',
    label: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80',
  },
  {
    slug: 'necklaces',
    label: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
  },
  {
    slug: 'earrings',
    label: 'Earrings',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&q=80',
  },
  {
    slug: 'bracelets',
    label: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
  },
]

const TRUST_BADGES = [
  {
    icon: Shield,
    title: 'Anti-Tarnish Guaranteed',
    desc: 'Every piece is coated for lasting shine',
  },
  {
    icon: Sparkles,
    title: 'Handcrafted Quality',
    desc: '925 sterling silver & 18k gold plating',
  },
  {
    icon: Truck,
    title: 'Pan-India Shipping',
    desc: 'Free on orders above ₹999',
  },
]

export default function Home() {
  const { data: featured, isLoading } = useFeaturedProducts()

  return (
    <>
      <SeoHead
        description="Dainty.muse — Handcrafted anti-tarnish jewellery. Minimal, feminine, forever."
        keywords="anti-tarnish jewellery, gold plated jewellery, rings, necklaces, earrings, bracelets"
      />

      {/* Hero */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden bg-champagne-50"
        aria-label="Hero"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1400&q=80)',
          }}
          aria-hidden="true"
        />

        {/* Decorative circles */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-champagne-200 opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full border border-champagne-200 opacity-30"
          aria-hidden="true"
        />

        <div className="relative z-10 px-4 animate-fade-in">
          <p className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-4">
            New Collection
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-warmBrown-600 leading-none mb-6">
            Wear the
            <br />
            <em className="text-champagne-gold font-light italic">moment.</em>
          </h1>
          <p className="font-sans text-warmBrown-400 text-base md:text-lg max-w-md mx-auto mb-10 font-light">
            Handcrafted anti-tarnish jewellery designed to last. Minimal, feminine, forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-champagne-gold text-warmBrown-700 px-8 py-3.5 text-sm font-sans uppercase tracking-widest hover:bg-champagne-500 transition-all duration-200"
            >
              Shop Now <ArrowRight size={14} />
            </Link>
            <Link
              to="/category/sets"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-sans uppercase tracking-widest border border-warmBrown-300 text-warmBrown-500 hover:border-champagne-gold hover:text-champagne-gold transition-all duration-200"
            >
              Gift Sets
            </Link>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section
        className="bg-warmBrown-700 py-8"
        aria-label="Trust signals"
      >
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-warmBrown-600">
          {TRUST_BADGES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center justify-center gap-4 py-4 sm:py-0 px-6">
              <Icon size={22} className="text-champagne-200 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-champagne-200">
                  {title}
                </p>
                <p className="text-xs font-sans text-warmBrown-300 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-label="Shop by category">
        <div className="text-center mb-12">
          <p className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-2">
            Explore
          </p>
          <h2 className="font-serif text-4xl text-warmBrown-600">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group relative overflow-hidden aspect-square"
              aria-label={`Shop ${cat.label}`}
            >
              <img
                src={cat.image}
                alt={cat.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-warmBrown-700/30 group-hover:bg-warmBrown-700/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-5">
                <span className="font-serif text-xl text-ivory-100 leading-tight">
                  {cat.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label="Featured jewellery">
        <div className="text-center mb-12">
          <p className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-2">
            Curated
          </p>
          <h2 className="font-serif text-4xl text-warmBrown-600">Our Favourites</h2>
        </div>

        {isLoading ? (
          <PageSpinner />
        ) : (
          <ProductGrid products={featured ?? []} columns={3} />
        )}

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-champagne-gold hover:text-champagne-dark transition-colors border-b border-champagne-300 pb-0.5"
          >
            View All Pieces <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Brand story / ethos strip */}
      <section className="bg-champagne-50 py-20" aria-label="About Dainty.muse">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-4">
            Our Story
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-warmBrown-600 mb-6 leading-relaxed">
            "Jewellery that tells your story,
            <br />
            <em className="font-light italic text-champagne-gold">not the tarnish."</em>
          </h2>
          <p className="text-sm font-sans text-warmBrown-400 leading-relaxed max-w-xl mx-auto">
            Dainty.muse was born from a simple idea: beautiful jewellery shouldn't come with an expiry date. Every piece in our collection is handcrafted with 925 sterling silver and 18k gold plating, finished with a professional anti-tarnish coating that keeps your pieces looking new — always.
          </p>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 text-center" aria-label="Instagram">
        <p className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-2">
          Stay Connected
        </p>
        <h2 className="font-serif text-3xl text-warmBrown-600 mb-4">
          @{import.meta.env.VITE_STORE_INSTAGRAM || 'daintymuse'}
        </h2>
        <a
          href={`https://instagram.com/${import.meta.env.VITE_STORE_INSTAGRAM || 'daintymuse'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-warmBrown-500 hover:text-champagne-gold transition-colors border-b border-champagne-200 pb-0.5"
        >
          Follow on Instagram
        </a>
      </section>
    </>
  )
}
