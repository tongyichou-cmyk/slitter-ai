import type { Locale } from '@/lib/i18n'

// 只放已確認的公司事實。規格依官網產品頁：
// https://www.slitterline.com/en-US/p1105-slitter-rotary-knives-slitter-blade
// https://www.slitterline.com/en-US/p1107-knife-spacer-spacer-liner
export const SITE = {
  url: 'https://www.slitter.ai',
  name: 'slitter.ai',
  company: {
    name: { en: 'TOA DR Enterprise Co., Ltd.', 'zh-TW': '道德煜企業有限公司' },
    shortName: { en: 'TOA DR', 'zh-TW': '道德煜企業' },
    founded: 1972,
    country: 'TW',
    certifications: ['ISO 9001:2015', 'D-U-N-S Registered'],
    website: 'https://www.slitterline.com',
  },
  knifeSpecs: {
    thicknessTolerance: '±0.001 mm',
    parallelism: '≤ 0.005 mm',
    maxOuterDiameter: '400 mm',
    source: 'https://www.slitterline.com/en-US/p1105-slitter-rotary-knives-slitter-blade',
  },
  spacerSpecs: {
    thicknessTolerance: '±0.001 mm',
    maxOuterDiameter: '400 mm',
    source: 'https://www.slitterline.com/en-US/p1107-knife-spacer-spacer-liner',
  },
  contact: {
    email: 'sales@slitterline.com',
    phone: '+886-2-2995-7607',
    line: { id: '@vup7881u', url: 'https://line.me/R/ti/p/@vup7881u', locales: ['zh-TW'] as Locale[] },
    whatsapp: { url: 'https://wa.me/886921068952', locales: ['en'] as Locale[] },
  },
} as const

export type OfficialLinkKey = 'home' | 'knives' | 'spacers' | 'machines' | 'regrinding' | 'inquiry' | 'contact'

const OFFICIAL_PATHS: Record<Locale, Record<OfficialLinkKey, string>> = {
  en: {
    home: '/en-US',
    knives: '/en-US/p1105-slitter-rotary-knives-slitter-blade',
    spacers: '/en-US/p1107-knife-spacer-spacer-liner',
    machines: '/en-US/product-list-1-',
    regrinding: '/en-US/product-list-6-',
    inquiry: '/en-US/inquiry',
    contact: '/en-US/contact',
  },
  'zh-TW': {
    home: '/zh-TW',
    knives: '/zh-TW/product-list-4-分條刀',
    spacers: '/zh-TW/product-list-7-精密墊片-鋼套',
    machines: '/zh-TW/product-list-1-精密分條機',
    regrinding: '/zh-TW/product-list-6-分條刀研磨服務',
    inquiry: '/zh-TW/inquiry',
    contact: '/zh-TW/contact',
  },
}

export function officialLink(locale: Locale, key: OfficialLinkKey): string {
  return encodeURI(SITE.company.website + OFFICIAL_PATHS[locale][key])
}

export type Contacts = {
  email: string
  phone: string
  line?: { id: string; url: string }
  whatsapp?: { url: string }
}

export function getContacts(locale: Locale): Contacts {
  const { email, phone, line, whatsapp } = SITE.contact
  return {
    email,
    phone,
    ...(line.locales.includes(locale) ? { line: { id: line.id, url: line.url } } : {}),
    ...(whatsapp.locales.includes(locale) ? { whatsapp: { url: whatsapp.url } } : {}),
  }
}
