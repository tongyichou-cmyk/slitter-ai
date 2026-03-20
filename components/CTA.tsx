import Link from 'next/link'

interface CTAProps {
  variant?: 'banner' | 'inline'
  heading?: string
  subheading?: string
  buttonText?: string
}

export default function CTA({
  variant = 'banner',
  heading = 'Need Precision Slitter Knives?',
  subheading = 'TOA DR Enterprise has supplied precision slitting tools since 1972. ISO 9001:2015 certified.',
  buttonText = 'Request a Quote →',
}: CTAProps) {
  if (variant === 'inline') {
    return (
      <div className="my-8 p-4 border-l-4 border-gold-500 bg-gray-800 rounded-r-lg">
        <p className="font-semibold text-gold-400">{heading}</p>
        <p className="text-sm text-gray-400 mt-1">{subheading}</p>
        <Link
          href="https://slitterline.com"
          target="_blank"
          rel="noopener"
          className="inline-block mt-3 px-4 py-2 bg-gold-500 text-gray-950 text-sm font-semibold rounded hover:bg-gold-400 transition-colors no-underline"
        >
          {buttonText}
        </Link>
      </div>
    )
  }

  return (
    <section className="my-12 bg-gray-900 border border-gray-600 rounded-xl p-10 text-center">
      <p className="text-xs font-semibold tracking-widest text-gold-600 uppercase mb-3">50+ Years of Precision</p>
      <h2 className="text-2xl font-bold text-white mb-3">{heading}</h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto">{subheading}</p>
      <Link
        href="https://slitterline.com"
        target="_blank"
        rel="noopener"
        className="inline-block px-8 py-3 bg-gold-500 text-gray-950 font-semibold rounded hover:bg-gold-400 transition-colors no-underline"
      >
        {buttonText}
      </Link>
    </section>
  )
}
