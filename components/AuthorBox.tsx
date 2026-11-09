import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'

export default async function AuthorBox({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'author' })
  return (
    <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-xl flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        T
      </div>
      <div>
        <p className="font-semibold text-gray-900">{t('name')}</p>
        <p className="text-sm text-brand-600">{t('role')}</p>
        <p className="text-sm text-gray-600 mt-2">{t('bio')}</p>
      </div>
    </div>
  )
}
