import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'
import type { PageEntry } from '@/lib/content/registry'
import { buildArticleSchema } from '@/lib/schema'
import SchemaScript from './SchemaScript'
import Breadcrumb from './Breadcrumb'
import CTA from './CTA'
import AuthorBox from './AuthorBox'
import FAQ from './FAQ'
import { ClearanceTable, Clearance, DataStatus } from './SlittingData'

export default async function ArticleView({ locale, page }: { locale: Locale; page: PageEntry }) {
  const tb = await getTranslations({ locale, namespace: 'breadcrumb' })
  const ta = await getTranslations({ locale, namespace: 'article' })
  const base = `/${locale}`
  const sectionCrumb = page.section === 'guide'
    ? { name: tb('guide'), href: `${base}/guide` }
    : { name: tb('wiki'), href: `${base}/wiki` }

  const components = {
    ClearanceTable: (props: { materials?: Parameters<typeof ClearanceTable>[0]['materials'] }) => <ClearanceTable locale={locale} {...props} />,
    DataStatus: () => <DataStatus locale={locale} />,
    Clearance,
  }

  return (
    <>
      <SchemaScript schemas={[buildArticleSchema({ locale, title: page.title, description: page.description, path: page.path, publishedAt: page.publishedAt, updatedAt: page.updatedAt })]} />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          currentPath={`${base}${page.path}`}
          items={[{ name: tb('home'), href: base }, sectionCrumb, { name: page.title }]}
        />

        <p className="text-xs text-gray-500 font-mono">
          {ta('published')} <time dateTime={page.publishedAt}>{page.publishedAt}</time>
          {page.updatedAt !== page.publishedAt && (
            <> · {ta('updated')} <time dateTime={page.updatedAt}>{page.updatedAt}</time></>
          )}
        </p>

        <div className="mt-6 prose prose-gray max-w-none">
          <MDXRemote
            source={page.body ?? ''}
            components={components}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />
        </div>

        {/* 內文已有可見的 FAQ 段落，這裡只輸出結構化資料 */}
        <FAQ items={page.faqs ?? []} heading={ta('faq')} visible={false} />

        <CTA locale={locale} variant="inline" />
        <AuthorBox locale={locale} />
      </article>
    </>
  )
}
