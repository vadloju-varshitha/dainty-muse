
export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block h-6 w-6 animate-spin rounded-full border-2 border-champagne-200 border-t-champagne-gold ${className}`}
    />
  )
}

export function PageSpinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner className="h-10 w-10" />
    </div>
  )
}
