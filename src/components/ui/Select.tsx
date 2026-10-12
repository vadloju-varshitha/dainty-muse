import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export function Select({ label, error, options, id, className = '', ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-sans uppercase tracking-widest text-warmBrown-400"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={[
          'w-full bg-ivory-100 border border-champagne-200 text-warmBrown-700 text-sm font-sans',
          'px-4 py-2.5 outline-none transition-colors duration-150 appearance-none cursor-pointer',
          'focus:border-champagne-gold focus:ring-1 focus:ring-champagne-gold',
          error ? 'border-red-400' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p role="alert" className="text-xs text-red-500 font-sans">
          {error}
        </p>
      )}
    </div>
  )
}
