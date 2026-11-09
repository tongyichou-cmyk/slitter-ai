import type { Metadata } from 'next'
import type { Locale } from './i18n'
import { registry as defaultRegistry, type Registry } from './content/registry'
import { SITE } from '@/data/site'

const BASE_URL = SITE.url

export function absoluteUrl(locale: Locale, pagePath: string): string {
  return `${BASE_URL}/${locale}${pagePath}`
}

export function ogLocale(locale: Locale): string {
  return locale === 'en' ? 'en_US' : 'zh_TW'
}

export function buildAlternates(locale: Locale, pagePath: string, reg: Registry = defaultRegistry) {
  const alternates = reg.getAlternates(pagePath)
  const languages: Record<string, string> = {}
  for (const alt of alternates) languages[alt.locale] = absoluteUrl(alt.locale, alt.path)
  if (alternates.some(a => a.locale === 'en')) languages['x-default'] = absoluteUrl('en', pagePath)
  return { canonical: absoluteUrl(locale, pagePath), languages }
}

export function buildMetadata({
  locale,
  path: pagePath,
  title,
  description,
  ogImage,
  registry: reg = defaultRegistry,
}: {
  locale: Locale
  path: string
  title?: string
  description?: string
  ogImage?: string
  registry?: Registry
}): Metadata {
  const page = reg.getPage(locale, pagePath)
  const pageTitle = title ?? page?.title ?? SITE.name
  const pageDescription = description ?? page?.description ?? ''
  const image = ogImage ?? `${BASE_URL}/og-default.jpg`
  const fullTitle = `${pageTitle} | ${SITE.name}`
  const alternates = buildAlternates(locale, pagePath, reg)

  return {
    title: fullTitle,
    description: pageDescription,
    alternates,
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      url: alternates.canonical,
      siteName: SITE.name,
      images: [{ url: image, width: 1200, height: 630, alt: pageTitle }],
      locale: ogLocale(locale),
      type: page?.section === 'wiki' || page?.section === 'guide' ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: pageDescription,
      images: [image],
    },
  }
}
