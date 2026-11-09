import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { getContacts, officialLink } from '@/data/site'
import Breadcrumb from '@/components/Breadcrumb'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({ locale, path: '/contact' })
}

export default async function ContactPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'contact' })
  const tb = await getTranslations({ locale, namespace: 'breadcrumb' })
  const contacts = getContacts(locale)
  const base = `/${locale}`
  const linkClass = 'text-brand-600 font-medium'

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb currentPath={`${base}/contact`} items={[{ name: tb('home'), href: base }, { name: t('heading') }]} />
      <h1>{t('heading')}</h1>
      <p className="mt-4 text-lg text-gray-600">{t('lead')}</p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-6 border border-gray-200 rounded-xl">
          <h2 className="text-lg font-semibold mb-3">{t('quoteHeading')}</h2>
          <p className="text-gray-600 text-sm mb-4">{t('quoteText')}</p>
          <Link href={officialLink(locale, 'inquiry')} target="_blank" rel="noopener" className={linkClass}>
            {t('quoteButton')} →
          </Link>
        </div>

        <div className="p-6 border border-gray-200 rounded-xl">
          <h2 className="text-lg font-semibold mb-3">{t('directHeading')}</h2>
          <dl className="text-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="text-gray-500">{t('email')}</dt>
            <dd><Link href={`mailto:${contacts.email}`} className={linkClass}>{contacts.email}</Link></dd>
            <dt className="text-gray-500">{t('phone')}</dt>
            <dd>{contacts.phone}</dd>
            {contacts.line && (
              <>
                <dt className="text-gray-500">{t('line')}</dt>
                <dd><Link href={contacts.line.url} target="_blank" rel="noopener" className={linkClass}>{contacts.line.id}</Link></dd>
              </>
            )}
            {contacts.whatsapp && (
              <>
                <dt className="text-gray-500">{t('whatsapp')}</dt>
                <dd><Link href={contacts.whatsapp.url} target="_blank" rel="noopener" className={linkClass}>+886 921 068 952</Link></dd>
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  )
}
