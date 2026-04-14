import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const WIKI_DIR = path.join(process.cwd(), 'content/wiki')

export interface WikiFrontmatter {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  lastModified?: string
}

export interface WikiContent {
  frontmatter: WikiFrontmatter
  content: string
  slug: string
}

function localeToDir(locale: string): string {
  if (locale === 'en') return WIKI_DIR
  return path.join(WIKI_DIR, locale)
}

export function getWikiContent(locale: string, slug: string): WikiContent | null {
  // Try locale-specific path first, then fall back to English
  const paths = [
    path.join(localeToDir(locale), `${slug}.mdx`),
    path.join(WIKI_DIR, `${slug}.mdx`),
  ]

  for (const filePath of paths) {
    if (fs.existsSync(filePath)) {
      const source = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(source)
      return {
        frontmatter: data as WikiFrontmatter,
        content,
        slug,
      }
    }
  }

  return null
}

export function getAllWikiSlugs(locale: string): string[] {
  const dir = localeToDir(locale)
  const slugs: string[] = []

  if (fs.existsSync(dir)) {
    fs.readdirSync(dir)
      .filter(f => f.endsWith('.mdx'))
      .forEach(f => slugs.push(f.replace('.mdx', '')))
  }

  // For non-English locales, also include English articles as fallback
  if (locale !== 'en' && fs.existsSync(WIKI_DIR)) {
    fs.readdirSync(WIKI_DIR)
      .filter(f => f.endsWith('.mdx'))
      .forEach(f => {
        const slug = f.replace('.mdx', '')
        if (!slugs.includes(slug)) slugs.push(slug)
      })
  }

  return slugs
}
