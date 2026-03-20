import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-600 mt-16 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-sm text-gray-500">
        <div>
          <p className="font-bold text-gold-500 text-base tracking-wide">
            slitter<span className="text-white">.ai</span>
          </p>
          <p className="mt-2 text-gray-500 max-w-xs">The global knowledge hub for slitting machine technology.</p>
          <p className="mt-3 text-gray-600">© {new Date().getFullYear()} TOA DR Enterprise Co., Ltd.</p>
        </div>
        <div className="flex gap-12">
          <div>
            <p className="font-semibold text-gray-300 mb-3">Knowledge</p>
            <ul className="space-y-2">
              <li><Link href="/en/wiki/slitter-knife" className="hover:text-gold-400 no-underline transition-colors">Slitter Knives</Link></li>
              <li><Link href="/en/wiki/slitting-machine" className="hover:text-gold-400 no-underline transition-colors">Slitting Machines</Link></li>
              <li><Link href="/en/wiki/slitting-process" className="hover:text-gold-400 no-underline transition-colors">Slitting Process</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-300 mb-3">Company</p>
            <ul className="space-y-2">
              <li><Link href="/en/about" className="hover:text-gold-400 no-underline transition-colors">About TOA DR</Link></li>
              <li><Link href="/en/contact" className="hover:text-gold-400 no-underline transition-colors">Contact</Link></li>
              <li><Link href="https://slitterline.com" target="_blank" rel="noopener" className="hover:text-gold-400 no-underline transition-colors">slitterline.com ↗</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
