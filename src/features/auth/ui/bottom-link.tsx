import Link from 'next/link'

export function BottomLink({
  linkText,
  text,
  url,
}: {
  text: string
  linkText: string
  url: string
}) {
  return (
    <p className={'flex justify-center gap-5 w-full text-sm text-gray-600'}>
      {text}
      <Link className={'font-medium text-primary hover:underline'} href={url}>
        {linkText}
      </Link>
    </p>
  )
}
