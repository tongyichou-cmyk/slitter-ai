import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import createNextIntlPlugin from 'next-intl/plugin'
import fs from 'fs'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
})

// 由 scripts/generate-redirects.ts 在 predev/prebuild 產生
const REDIRECTS_FILE = new URL('./.generated/redirects.json', import.meta.url)

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    if (!fs.existsSync(REDIRECTS_FILE)) {
      throw new Error('找不到 .generated/redirects.json，請先執行 npm run generate:redirects')
    }
    return JSON.parse(fs.readFileSync(REDIRECTS_FILE, 'utf8'))
  },
  images: { remotePatterns: [] },
  experimental: {
    browsersListForSwc: true,
  },
}

export default withNextIntl(withMDX(nextConfig))
