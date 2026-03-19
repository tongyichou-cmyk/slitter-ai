interface AuthorBoxProps {
  name?: string
  title?: string
  bio?: string
}

export default function AuthorBox({
  name = 'TOA DR Engineering Team',
  title = 'Precision Slitting Specialists',
  bio = 'TOA DR Enterprise Co., Ltd. has manufactured precision slitting knives and spacer rings since 1972. Our engineering team brings decades of hands-on experience in metal slitting, film slitting, and high-precision applications.',
}: AuthorBoxProps) {
  return (
    <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-xl flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        T
      </div>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-brand-600">{title}</p>
        <p className="text-sm text-gray-600 mt-2">{bio}</p>
      </div>
    </div>
  )
}
