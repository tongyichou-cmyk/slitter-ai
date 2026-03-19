import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'slitter.ai — Slitting Machine Knowledge Hub',
  description: 'The global authority platform for slitting machine technology, slitter knives, and precision slitting processes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
