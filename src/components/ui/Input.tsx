import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, id, className = '', ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-sans uppercase tracking-widest text-warmBrown-400"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'w-full bg-ivory-100 border border-champagne-200 text-warmBrown-700 text-sm font-sans',
          'px-4 py-2.5 outline-none transition-colors duration-150',
          'placeholder:text-warmBrown-300',
          'focus:border-champagne-gold focus:ring-1 focus:ring-champagne-gold',
          error ? 'border-red-400' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-warmBrown-300 font-sans">{hint}</p>
      )}
      {error && (
        <p role="alert" className="text-xs text-red-500 font-sans">
          {error}
        </p>
      )}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-sans uppercase tracking-widest text-warmBrown-400"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={[
          'w-full bg-ivory-100 border border-champagne-200 text-warmBrown-700 text-sm font-sans',
          'px-4 py-2.5 outline-none transition-colors duration-150 resize-vertical min-h-[100px]',
          'placeholder:text-warmBrown-300',
          'focus:border-champagne-gold focus:ring-1 focus:ring-champagne-gold',
          error ? 'border-red-400' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {error && (
        <p role="alert" className="text-xs text-red-500 font-sans">
          {error}
        </p>
      )}
    </div>
  )
}
