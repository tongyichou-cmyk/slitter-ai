import type { Metadata } from 'next'
import type { Locale } from './i18n'

const BASE_URL = 'https://slitter.ai'

export function buildMetadata({
  title,
  description,
  locale,
  path,
  ogImage,
}: {
  title: string
  description: string
  locale: Locale
  path: string
  ogImage?: string
}): Metadata {
  const url = `${BASE_URL}/${locale}${path}`
  const image = ogImage ?? `${BASE_URL}/og-default.png`

  return {
    title: `${title} | slitter.ai`,
    description,
    alternates: {
      canonical: url,
      languages: {
        'en': `${BASE_URL}/en${path}`,
        'x-default': `${BASE_URL}/en${path}`,
      },
    },
    openGraph: {
      title: `${title} | slitter.ai`,
      description,
      url,
      siteName: 'slitter.ai',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: locale === 'en' ? 'en_US' : locale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | slitter.ai`,
      description,
      images: [image],
    },
  }
}
