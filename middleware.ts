import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from './lib/i18n'

const intl = createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'always',
})

export default function middleware(request: NextRequest) {
  // 簡中已關閉。有對應繁中頁面的網址已在 next.config.mjs 以 301 轉址，其餘一律 404，不再轉到英文。
  if (/^\/zh-CN(\/|$)/i.test(request.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL('/en/__retired-locale', request.url))
  }
  return intl(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
