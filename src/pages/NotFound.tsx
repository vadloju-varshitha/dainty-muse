import { Link } from 'react-router-dom'
import { SeoHead } from '../components/ui/SeoHead'

export default function NotFound() {
  return (
    <>
      <SeoHead title="Page Not Found" noindex />
      <div className="max-w-xl mx-auto px-4 py-32 text-center">
        <p className="font-serif text-8xl text-champagne-200 mb-6" aria-hidden>404</p>
        <h1 className="font-serif text-3xl text-warmBrown-600 mb-3">Page Not Found</h1>
        <p className="text-sm font-sans text-warmBrown-400 mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-champagne-gold text-warmBrown-700 px-8 py-3.5 text-xs font-sans uppercase tracking-widest hover:bg-champagne-500 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </>
  )
}
