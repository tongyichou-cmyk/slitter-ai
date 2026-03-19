import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'zh-TW', 'zh-CN'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
