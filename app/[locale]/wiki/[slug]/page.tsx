import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { buildArticleSchema, buildBreadcrumbSchema, SCHEMA_BASE_URL } from '@/lib/schema'
import SchemaScript from '@/components/SchemaScript'
import Breadcrumb from '@/components/Breadcrumb'
import CTA from '@/components/CTA'
import AuthorBox from '@/components/AuthorBox'
import { getWikiContent, getAllWikiSlugs } from '@/lib/wiki'
import type { Locale } from '@/lib/i18n'
import remarkGfm from 'remark-gfm'

type Props = {
  params: { locale: Locale; slug: string }
}

export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'zh-TW', 'zh-CN']
  const params: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    const slugs = getAllWikiSlugs(locale)
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }

  return params
}

export async function generateMetadata({ params: { locale, slug } }: Props) {
  const wiki = getWikiContent(locale, slug)
  if (!wiki) return {}

  return buildMetadata({
    title: wiki.frontmatter.title,
    description: wiki.frontmatter.description,
    locale,
    path: `/wiki/${slug}`,
  })
}

export default function WikiSlugPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale)

  const wiki = getWikiContent(locale, slug)
  if (!wiki) notFound()

  const base = `/${locale}`
  const { frontmatter, content } = wiki

  return (
    <>
      <SchemaScript schemas={[
        buildArticleSchema({
          title: frontmatter.title,
          description: frontmatter.description,
          url: `${SCHEMA_BASE_URL}/${locale}/wiki/${slug}`,
          datePublished: frontmatter.lastModified ?? '2026-04-14',
          dateModified: frontmatter.lastModified,
        }),
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SCHEMA_BASE_URL}/${locale}` },
          { name: frontmatter.title, url: `${SCHEMA_BASE_URL}/${locale}/wiki/${slug}` },
        ]),
      ]} />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb items={[
          { name: 'Home', href: base },
          { name: 'Knowledge Base', href: `${base}/wiki` },
          { name: frontmatter.title },
        ]} />

        <div className="mt-8 prose prose-gray max-w-none">
          <MDXRemote
            source={content}
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
