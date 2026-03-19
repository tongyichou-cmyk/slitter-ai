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
      <div className="my-8 p-4 border-l-4 border-brand-600 bg-brand-50 rounded-r-lg">
        <p className="font-semibold text-brand-900">{heading}</p>
        <p className="text-sm text-gray-600 mt-1">{subheading}</p>
        <Link
          href="https://slitterline.com"
          target="_blank"
          rel="noopener"
          className="inline-block mt-3 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded hover:bg-brand-700 transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    )
  }

  return (
    <section className="my-12 p-8 bg-brand-900 text-white rounded-xl text-center">
      <h2 className="text-2xl font-bold mb-2">{heading}</h2>
      <p className="text-brand-100 mb-6 max-w-xl mx-auto">{subheading}</p>
      <Link
        href="https://slitterline.com"
        target="_blank"
        rel="noopener"
        className="inline-block px-6 py-3 bg-white text-brand-900 font-semibold rounded-lg hover:bg-brand-50 transition-colors"
      >
        {buttonText}
      </Link>
    </section>
  )
}
