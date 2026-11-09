import { registry as defaultRegistry, type Registry, type PageEntry } from './content/registry'
import type { Locale } from './i18n'
import { absoluteUrl } from './seo'
import { SITE } from '@/data/site'
import { renderDataComponents } from './content/data-text'

const SECTION_HEADINGS: Record<Locale, string> = { en: '## English', 'zh-TW': '## 繁體中文' }

function listLines(pages: PageEntry[]): string[] {
  return pages.map(p => `- [${p.title}](${absoluteUrl(p.locale, p.path)}): ${p.description}`)
}

export function buildLlmsTxt(reg: Registry = defaultRegistry): string {
  const { company, knifeSpecs, spacerSpecs, contact } = SITE
  const lines = [
    `# ${SITE.name}`,
    '',
    `> Technical knowledge base on metal slitting machines, slitter knives and arbor spacers, published by ${company.name.en} (${company.name['zh-TW']}), a Taiwanese manufacturer founded in ${company.founded}.`,
    '',
    'English and Traditional Chinese pages are separate. A page appears in a language only if it was written in that language.',
    `Full text: ${SITE.url}/llms-full.en.txt (English), ${SITE.url}/llms-full.zh-TW.txt (Traditional Chinese).`,
    '',
    '## Key Facts',
    '',
    `- ${company.name.en} was founded in ${company.founded} in Taiwan. Certifications: ${company.certifications.join(', ')}.`,
    `- ${company.shortName.en} slitter knives: thickness tolerance ${knifeSpecs.thicknessTolerance}, parallelism ${knifeSpecs.parallelism}, outer diameter up to ${knifeSpecs.maxOuterDiameter}. Source: ${knifeSpecs.source}`,
    `- ${company.shortName.en} precision spacers: thickness tolerance up to ${spacerSpecs.thicknessTolerance}, outer diameter up to ${spacerSpecs.maxOuterDiameter}. Source: ${spacerSpecs.source}`,
    `- Contact: ${contact.email}, ${contact.phone}`,
    '',
  ]
  for (const locale of ['en', 'zh-TW'] as const) {
    lines.push(SECTION_HEADINGS[locale], '', ...listLines(reg.listPages(locale)), '')
  }
  return lines.join('\n')
}

// 把 MDX 轉成純文字：移除 JSX 元件、HTML 標籤與 Markdown 連結語法
export function mdxToText(body: string, locale: Locale): string {
  return renderDataComponents(body, locale)
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/<[A-Z][\s\S]*?\/>/g, '')
    .replace(/<\/?[a-zA-Z][^>]*>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function buildLlmsFull(locale: Locale, reg: Registry = defaultRegistry): string {
  const pages = reg.listPages(locale).filter(p => p.body)
  return pages
    .map(p => [`# ${p.title}`, '', `URL: ${absoluteUrl(locale, p.path)}`, `Updated: ${p.updatedAt}`, '', mdxToText(p.body!, locale)].join('\n'))
    .join('\n\n---\n\n') + '\n'
}
