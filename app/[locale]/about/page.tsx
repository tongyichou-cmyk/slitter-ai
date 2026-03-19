import { buildMetadata } from '@/lib/seo'
import CTA from '@/components/CTA'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({
    title: 'About — TOA DR Enterprise Co., Ltd.',
    description: 'About TOA DR Enterprise Co., Ltd. Precision slitting knife manufacturer since 1972. ISO 9001:2015 certified. Trusted by factories in Taiwan, Southeast Asia, and globally.',
    locale,
    path: '/about',
  })
}

export default function AboutPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1>About slitter.ai & TOA DR Enterprise</h1>

      <div className="mt-6 prose prose-gray max-w-none">
        <p className="text-lg text-gray-600">slitter.ai is the engineering knowledge platform operated by <strong>TOA DR Enterprise Co., Ltd.</strong> — a precision slitting tool manufacturer established in 1972.</p>

        <h2>Our Mission</h2>
        <p>We built slitter.ai to solve a real problem: engineers searching for reliable slitting technology data have historically found fragmented, vendor-biased, or low-quality information. slitter.ai is our commitment to changing that — providing engineering-grade content that is accurate, sourced, and useful in production environments.</p>

        <h2>About TOA DR Enterprise</h2>
        <ul>
          <li><strong>Founded:</strong> 1972</li>
          <li><strong>Specialization:</strong> Precision slitting knives, spacer rings, arbors, and slitting machine components</li>
          <li><strong>Certification:</strong> ISO 9001:2015</li>
          <li><strong>D-U-N-S:</strong> Registered</li>
          <li><strong>Primary Markets:</strong> Taiwan, Southeast Asia, global OEM</li>
          <li><strong>Contact:</strong> sales@slitterline.com</li>
          <li><strong>Website:</strong> slitterline.com</li>
        </ul>

        <h2>Editorial Standards</h2>
        <p>All content on slitter.ai is written or reviewed by TOA DR engineering staff with direct manufacturing experience. Claims are traceable to our internal engineering data, industry standards (JIS, DIN, ASTM), or cited external sources. We do not publish content we cannot verify.</p>
      </div>

      <CTA variant="banner" />
    </article>
  )
}
