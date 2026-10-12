import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Shop All', href: '/products' },
  { label: 'Rings', href: '/category/rings' },
  { label: 'Necklaces', href: '/category/necklaces' },
  { label: 'Earrings', href: '/category/earrings' },
  { label: 'Bracelets', href: '/category/bracelets' },
  { label: 'Sets', href: '/category/sets' },
]

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const totalItems = useCartStore((s) => s.totalItems())
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-ivory-100/95 backdrop-blur-md shadow-sm' : 'bg-ivory-100'
        }`}
      >
        {/* Announcement bar */}
        <div className="bg-warmBrown-500 text-ivory-50 text-center py-1.5 text-xs font-sans tracking-widest uppercase">
          Free shipping on orders above ₹999 &nbsp;·&nbsp; Anti-tarnish guaranteed
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-warmBrown-500 hover:text-champagne-gold transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <div className="flex-1 flex justify-center lg:justify-start">
              <Logo size="md" />
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-xs font-sans uppercase tracking-widest text-warmBrown-500 hover:text-champagne-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-warmBrown-500 hover:text-champagne-gold transition-colors"
                aria-label="Search products"
              >
                <Search size={18} />
              </button>

              <Link
                to="/wishlist"
                className="relative p-2 text-warmBrown-500 hover:text-champagne-gold transition-colors"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span
                    className="absolute top-0.5 right-0.5 h-4 w-4 bg-champagne-gold text-white text-[10px] rounded-full flex items-center justify-center font-sans"
                    aria-hidden="true"
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative p-2 text-warmBrown-500 hover:text-champagne-gold transition-colors"
                aria-label={`Cart (${totalItems} items)`}
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span
                    className="absolute top-0.5 right-0.5 h-4 w-4 bg-champagne-gold text-white text-[10px] rounded-full flex items-center justify-center font-sans"
                    aria-hidden="true"
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div className="bg-ivory-100 border-t border-champagne-100 px-4 py-3">
            <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
              <label htmlFor="site-search" className="sr-only">
                Search jewellery
              </label>
              <input
                id="site-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rings, necklaces, gifts…"
                autoFocus
                className="flex-1 bg-transparent border-b border-champagne-300 text-warmBrown-700 text-sm font-sans pb-1 outline-none placeholder:text-warmBrown-300 focus:border-champagne-gold transition-colors"
              />
              <button
                type="submit"
                className="text-xs font-sans uppercase tracking-widest text-champagne-gold hover:text-champagne-dark transition-colors"
              >
                Go
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-warmBrown-700/40" aria-hidden="true" />
          <nav
            className="absolute left-0 top-0 bottom-0 w-72 bg-ivory-100 shadow-xl flex flex-col pt-20 px-6 gap-1"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="py-3 border-b border-champagne-100 text-sm font-sans uppercase tracking-widest text-warmBrown-500 hover:text-champagne-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-2">
              <Link
                to="/wishlist"
                className="py-2 text-sm font-sans text-warmBrown-400 hover:text-champagne-gold transition-colors"
              >
                Wishlist ({wishlistCount})
              </Link>
              <Link
                to="/cart"
                className="py-2 text-sm font-sans text-warmBrown-400 hover:text-champagne-gold transition-colors"
              >
                Cart ({totalItems})
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-[calc(2.25rem+4rem)]" aria-hidden="true" />
    </>
  )
}
