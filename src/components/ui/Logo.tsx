import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Dainty.muse brand logo — SVG wordmark.
 * Replace the SVG content with your actual logo file if you have one,
 * or swap the <img> src to /logo.svg (place your file in /public/).
 */
export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = { sm: 'h-8', md: 'h-10', lg: 'h-14' }

  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`} aria-label="Dainty.muse home">
      {/* Inline SVG wordmark — elegant minimal design */}
      <svg
        viewBox="0 0 200 48"
        className={`${sizes[size]} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Decorative ring motif */}
        <circle cx="16" cy="24" r="10" stroke="#C9A96E" strokeWidth="1.2" />
        <circle cx="16" cy="24" r="5" stroke="#C9A96E" strokeWidth="0.8" opacity="0.5" />
        {/* Wordmark */}
        <text
          x="34"
          y="31"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="22"
          fontWeight="400"
          fill="#6B4F3A"
          letterSpacing="1"
        >
          Dainty
        </text>
        <text
          x="115"
          y="31"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="22"
          fontWeight="300"
          fill="#C9A96E"
        >
          .muse
        </text>
      </svg>
    </Link>
  )
}
