import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { LOCALES, registry } from '@/lib/content/registry'
import ArticleView from '@/components/ArticleView'
import type { Locale } from '@/lib/i18n'

type Props = { params: { locale: Locale; slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.flatMap(locale =>
    registry.listPages(locale).filter(p => p.section === 'guide').map(p => ({ locale, slug: p.slug })),
  )
}

export async function generateMetadata({ params: { locale, slug } }: Props) {
  if (!registry.getPage(locale, `/guide/${slug}`)) return {}
  return buildMetadata({ locale, path: `/guide/${slug}` })
}

export default function GuideArticlePage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale)
  const page = registry.getPage(locale, `/guide/${slug}`)
  if (!page) notFound()
  return <ArticleView locale={locale} page={page} />
}
