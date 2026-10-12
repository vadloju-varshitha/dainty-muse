import { Link } from 'react-router-dom'
import { Instagram, Mail, MessageCircle } from 'lucide-react'
import { Logo } from '../ui/Logo'

const POLICY_LINKS = [
  { label: 'Shipping Policy', href: '/policies/shipping' },
  { label: 'Returns & Exchange', href: '/policies/returns' },
  { label: 'Privacy Policy', href: '/policies/privacy' },
  { label: 'Jewellery Care Guide', href: '/policies/care' },
]

const SHOP_LINKS = [
  { label: 'Shop All', href: '/products' },
  { label: 'Rings', href: '/category/rings' },
  { label: 'Necklaces', href: '/category/necklaces' },
  { label: 'Earrings', href: '/category/earrings' },
  { label: 'Bracelets', href: '/category/bracelets' },
  { label: 'Sets & Gifts', href: '/category/sets' },
]

export function Footer() {
  const instagram = import.meta.env.VITE_STORE_INSTAGRAM || 'daintymuse'
  const email = import.meta.env.VITE_STORE_EMAIL || 'hello@daintymuse.com'
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'

  return (
    <footer className="bg-warmBrown-700 text-ivory-200 mt-24" role="contentinfo">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Logo size="sm" className="brightness-200 [&_text]:fill-champagne-200" />
          <p className="text-sm font-sans text-warmBrown-200 leading-relaxed max-w-xs">
            Handcrafted anti-tarnish jewellery. Minimal, feminine, forever.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dainty.muse on Instagram"
              className="text-warmBrown-300 hover:text-champagne-200 transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="text-warmBrown-300 hover:text-champagne-200 transition-colors"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href={`mailto:${email}`}
              aria-label={`Email us at ${email}`}
              className="text-warmBrown-300 hover:text-champagne-200 transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-xs font-sans uppercase tracking-ultra text-champagne-200 mb-4">
            Shop
          </h3>
          <ul className="flex flex-col gap-2">
            {SHOP_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm font-sans text-warmBrown-200 hover:text-champagne-200 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-xs font-sans uppercase tracking-ultra text-champagne-200 mb-4">
            Help
          </h3>
          <ul className="flex flex-col gap-2">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm font-sans text-warmBrown-200 hover:text-champagne-200 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-sans uppercase tracking-ultra text-champagne-200 mb-4">
            Contact
          </h3>
          <ul className="flex flex-col gap-3 text-sm font-sans text-warmBrown-200">
            <li>
              <a href={`mailto:${email}`} className="hover:text-champagne-200 transition-colors">
                {email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-champagne-200 transition-colors"
              >
                WhatsApp us
              </a>
            </li>
            <li className="text-warmBrown-300 text-xs leading-relaxed mt-1">
              Mon–Sat, 10am–6pm IST
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warmBrown-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-sans text-warmBrown-300">
            © {new Date().getFullYear()} Dainty.muse. All rights reserved.
          </p>
          <p className="text-xs font-sans text-warmBrown-400">
            Payments secured by Razorpay
          </p>
        </div>
      </div>
    </footer>
  )
}
