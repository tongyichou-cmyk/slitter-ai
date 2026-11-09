export const locales = ['en', 'zh-TW'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'zh-TW': '繁體中文',
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
