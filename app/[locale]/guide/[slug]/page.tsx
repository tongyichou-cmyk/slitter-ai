import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { buildArticleSchema, buildBreadcrumbSchema, SCHEMA_BASE_URL } from '@/lib/schema'
import SchemaScript from '@/components/SchemaScript'
import Breadcrumb from '@/components/Breadcrumb'
import CTA from '@/components/CTA'
import AuthorBox from '@/components/AuthorBox'
import { getArticleBySlug, getAllArticles } from '@/lib/data'
import type { Locale } from '@/lib/i18n'
import remarkGfm from 'remark-gfm'

type Props = {
  params: { locale: Locale; slug: string }
}

export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'zh-TW', 'zh-CN']
  const params: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    const articles = getAllArticles(locale, 'guide')
    for (const article of articles) {
      params.push({ locale, slug: article.slug })
    }
  }

  return params
}

export async function generateMetadata({ params: { locale, slug } }: Props) {
  const article = getArticleBySlug(locale, 'guide', slug)
  if (!article) return {}

  return buildMetadata({
    title: article.title,
    description: article.description,
    locale,
    path: `/guide/${slug}`,
  })
}

export default function GuideSlugPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale)

  const article = getArticleBySlug(locale, 'guide', slug)
  if (!article) notFound()

  const base = `/${locale}`

  return (
    <>
      <SchemaScript schemas={[
        buildArticleSchema({
          title: article.title,
          description: article.description,
          url: `${SCHEMA_BASE_URL}/${locale}/guide/${slug}`,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt ?? article.publishedAt,
        }),
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SCHEMA_BASE_URL}/${locale}` },
          { name: 'Guides', url: `${SCHEMA_BASE_URL}/${locale}/guide` },
          { name: article.title, url: `${SCHEMA_BASE_URL}/${locale}/guide/${slug}` },
        ]),
      ]} />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb items={[
          { name: 'Home', href: base },
          { name: 'Guides', href: `${base}/guide` },
          { name: article.title },
        ]} />

        <div className="mt-8 prose prose-gray max-w-none">
          <MDXRemote
            source={article.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>

        <CTA variant="inline" />
        <AuthorBox />
      </article>
    </>
  )
}
