import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.slitter.ai'),
  title: 'slitter.ai',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
