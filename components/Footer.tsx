import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16 py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-sm text-gray-500">
        <div>
          <p className="font-semibold text-gray-900 text-base">slitter.ai</p>
          <p className="mt-1">The global knowledge hub for slitting machine technology.</p>
          <p className="mt-1">© {new Date().getFullYear()} TOA DR Enterprise Co., Ltd.</p>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="font-medium text-gray-700 mb-2">Knowledge</p>
            <ul className="space-y-1">
              <li><Link href="/en/wiki/slitter-knife" className="hover:text-brand-600">Slitter Knives</Link></li>
              <li><Link href="/en/wiki/slitting-machine" className="hover:text-brand-600">Slitting Machines</Link></li>
              <li><Link href="/en/wiki/slitting-process" className="hover:text-brand-600">Slitting Process</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-2">Company</p>
            <ul className="space-y-1">
              <li><Link href="/en/about" className="hover:text-brand-600">About TOA DR</Link></li>
              <li><Link href="/en/contact" className="hover:text-brand-600">Contact</Link></li>
              <li><Link href="https://slitterline.com" target="_blank" rel="noopener" className="hover:text-brand-600">slitterline.com ↗</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
