export type SchemaObject = Record<string, unknown>

export function buildOrganizationSchema(): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TOA DR Enterprise Co., Ltd.',
    url: 'https://slitterline.com',
    foundingDate: '1972',
    description: 'Precision slitting knives, spacer rings, and slitting machine components.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'sales@slitterline.com',
      contactType: 'sales',
    },
  }
}

export function buildWebSiteSchema(): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'slitter.ai',
    url: 'https://slitter.ai',
    description: 'The global knowledge hub for slitting machine technology.',
    publisher: buildOrganizationSchema(),
  }
}

export function buildArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  authorName?: string
}): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Person',
      name: authorName ?? 'TOA DR Engineering Team',
    },
    publisher: buildOrganizationSchema(),
  }
}

export function buildFAQSchema(items: { q: string; a: string }[]): SchemaObject {
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

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, url }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: url,
    })),
  }
}
