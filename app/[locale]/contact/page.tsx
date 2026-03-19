import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({
    title: 'Contact — Request a Quote or Technical Consultation',
    description: 'Contact TOA DR Enterprise for slitter knife quotes, technical consultation, or custom specifications. Email: sales@slitterline.com',
    locale,
    path: '/contact',
  })
}

export default function ContactPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1>Contact & Inquiries</h1>
      <p className="mt-4 text-lg text-gray-600">All product inquiries, RFQ requests, and technical consultations are handled through <strong>slitterline.com</strong>.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-6 border border-gray-200 rounded-xl">
          <h2 className="text-lg font-semibold mb-3">Product Inquiries & Quotes</h2>
          <p className="text-gray-600 text-sm mb-4">For pricing, specifications, and delivery — contact our sales team directly.</p>
          <Link href="mailto:sales@slitterline.com" className="block text-brand-600 font-medium">sales@slitterline.com</Link>
          <Link href="https://slitterline.com" target="_blank" rel="noopener" className="mt-2 block text-brand-600 font-medium">slitterline.com →</Link>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl">
          <h2 className="text-lg font-semibold mb-3">Taiwan Domestic</h2>
          <p className="text-gray-600 text-sm mb-4">Taiwan-based customers can reach us directly via LINE.</p>
          <Link href="https://line.me/R/ti/p/@256nfmzx" target="_blank" rel="noopener" className="block text-brand-600 font-medium">LINE@ @256nfmzx</Link>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="https://slitterline.com"
          target="_blank"
          rel="noopener"
          className="inline-block px-8 py-4 bg-brand-600 text-white text-lg font-semibold rounded-xl hover:bg-brand-700 no-underline transition-colors"
        >
          Visit slitterline.com to Request a Quote →
        </Link>
      </div>
    </div>
  )
}
