import { Helmet } from 'react-helmet-async'
import { buildPageTitle } from '../../lib/utils'

interface SeoHeadProps {
  title?: string
  description?: string
  image?: string
  keywords?: string
  noindex?: boolean
}

export function SeoHead({
  title,
  description = 'Dainty.muse — Handcrafted anti-tarnish jewellery. Minimal, feminine, forever.',
  image = '/og-image.jpg',
  keywords,
  noindex = false,
}: SeoHeadProps) {
  const fullTitle = buildPageTitle(title)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
