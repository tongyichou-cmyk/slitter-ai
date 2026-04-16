import { buildMetadata } from '@/lib/seo'
import { buildBreadcrumbSchema } from '@/lib/schema'
import SchemaScript from '@/components/SchemaScript'
import Breadcrumb from '@/components/Breadcrumb'
import Calculator from '@/components/Calculator'
import CTA from '@/components/CTA'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({
    title: 'Slitter Clearance Calculator',
    description: 'Calculate recommended slitter knife clearance by material and thickness. Engineering tool for procurement and manufacturing engineers.',
    locale,
    path: '/tools/clearance-calculator',
  })
}

export default function CalculatorPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const base = `/${locale}`
  return (
    <>
      <SchemaScript schemas={[buildBreadcrumbSchema([
        { name: 'Home', url: `https://slitter.ai/${locale}` },
        { name: 'Tools', url: `https://slitter.ai/${locale}/tools/clearance-calculator` },
        { name: 'Clearance Calculator', url: `https://slitter.ai/${locale}/tools/clearance-calculator` },
      ])]} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb items={[
          { name: 'Home', href: base },
          { name: 'Tools', href: `${base}/tools` },
          { name: 'Clearance Calculator' },
        ]} />

        <h1>Slitter Knife Clearance Calculator</h1>
        <p className="mt-3 text-gray-600 mb-8">Enter your material type and thickness to get the recommended knife clearance range. Based on industry standards and TOA DR engineering data.</p>

        <Calculator />

        <div className="mt-12">
          <CTA variant="banner" heading="Need Custom Knife Specifications?" subheading="Our engineering team can advise on exact clearance, knife geometry, and material selection for your specific application." />
        </div>
      </div>
    </>
  )
}
