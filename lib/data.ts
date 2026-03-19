import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Locale } from './i18n'

export interface ArticleFrontmatter {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  author?: string
  tags?: string[]
  faqs?: { q: string; a: string }[]
}

export interface Article extends ArticleFrontmatter {
  slug: string
  locale: Locale
  content: string
}

const contentDir = path.join(process.cwd(), 'content')

export function getArticleBySlug(locale: Locale, section: string, slug: string): Article | null {
  const filePath = path.join(contentDir, locale, section, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { ...(data as ArticleFrontmatter), slug, locale, content }
}

export function getAllArticles(locale: Locale, section: string): Article[] {
  const dir = path.join(contentDir, locale, section)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const slug = f.replace('.mdx', '')
      return getArticleBySlug(locale, section, slug)!
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}
