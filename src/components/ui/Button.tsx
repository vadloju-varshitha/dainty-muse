import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-champagne-gold text-warmBrown-700 hover:bg-champagne-500 border border-champagne-gold focus-visible:ring-champagne-gold',
  secondary:
    'bg-transparent text-warmBrown-500 border border-warmBrown-300 hover:border-champagne-gold hover:text-champagne-gold focus-visible:ring-warmBrown-300',
  ghost:
    'bg-transparent text-warmBrown-500 hover:text-champagne-gold hover:bg-champagne-50 focus-visible:ring-champagne-gold',
  danger:
    'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 focus-visible:ring-red-400',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-xs tracking-widest',
  md: 'px-6 py-2.5 text-xs tracking-widest',
  lg: 'px-8 py-3.5 text-sm tracking-widest',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 font-sans uppercase transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading && (
        <svg
          className="animate-spin h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
