import type { Locale } from './i18n'
import { SITE } from '@/data/site'
import type { FaqItem } from './content/registry'

export const SCHEMA_BASE_URL = SITE.url

export type SchemaObject = Record<string, unknown>

function organization(locale: Locale = 'en'): SchemaObject {
  return {
    '@type': 'Organization',
    name: SITE.company.name[locale],
    alternateName: locale === 'en' ? SITE.company.name['zh-TW'] : SITE.company.name.en,
    url: SITE.company.website,
    foundingDate: String(SITE.company.founded),
    email: SITE.contact.email,
    telephone: SITE.contact.phone,
    sameAs: [SITE.company.website],
  }
}

export function buildOrganizationSchema(locale: Locale = 'en'): SchemaObject {
  return { '@context': 'https://schema.org', ...organization(locale) }
}

export function buildWebSiteSchema(locale: Locale = 'en'): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: `${SITE.url}/${locale}`,
    inLanguage: locale,
    publisher: organization(locale),
  }
}

export function buildArticleSchema({
  locale,
  title,
  description,
  path,
  publishedAt,
  updatedAt,
}: {
  locale: Locale
  title: string
  description: string
  path: string
  publishedAt: string
  updatedAt: string
}): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE.url}/${locale}${path}`,
    inLanguage: locale,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: organization(locale),
    publisher: organization(locale),
  }
}

export function buildFAQSchema(items: FaqItem[]): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

// path 是含語系的站內路徑，例如 '/zh-TW/wiki/slitter-knife'
export function buildBreadcrumbSchema(items: { name: string; path: string }[]): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, path }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE.url}${path}`,
    })),
  }
}

export const DATASET_LICENSE = 'https://creativecommons.org/licenses/by/4.0/'

// Google 規定 Dataset 的 description 必須 50–5000 字元；不合格時讓建置失敗
const DATASET_DESCRIPTION_RANGE = [50, 5000] as const

export function buildDatasetSchema({
  locale,
  name,
  description,
  path,
  version,
  updatedAt,
}: {
  locale: Locale
  name: string
  description: string
  path: string
  version: string
  updatedAt: string
}): SchemaObject {
  const length = [...description].length
  const [min, max] = DATASET_DESCRIPTION_RANGE
  if (length < min || length > max) {
    throw new Error(`Dataset ${path} (${locale}) 的 description 是 ${length} 字元，必須在 ${min}–${max} 之間`)
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    url: `${SITE.url}/${locale}${path}`,
    inLanguage: locale,
    version,
    dateModified: updatedAt,
    license: DATASET_LICENSE,
    creator: organization(locale),
  }
}
