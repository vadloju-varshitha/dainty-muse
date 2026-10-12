import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'brown' | 'green' | 'red' | 'gray'
  className?: string
}

const variants = {
  gold: 'bg-champagne-100 text-champagne-dark border-champagne-200',
  brown: 'bg-warmBrown-50 text-warmBrown-500 border-warmBrown-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
}

export function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-sans border rounded-full tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
