import Image from 'next/image'
import { useTranslations } from 'next-intl'

const EVENTS: { key: string; src: string }[] = [
  { key: 'edibleTasting', src: 'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/edibles.webp' },
  { key: 'poker',         src: 'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/poker.webp' },
  { key: 'playstation',   src: 'https://picsum.photos/seed/thefarm-gaming/600/400' },
  { key: 'memberSunday',  src: 'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/member.webp' },
]

export default function EventsSection() {
  const t = useTranslations('home.events')

  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h2 className="font-storica mt-3 text-4xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">{t('description')}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTS.map(({ key, src }) => (
            <div key={key} className="bg-white overflow-hidden rounded-2xl shadow-md group">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={src}
                  alt={t(`${key}.title`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {key === 'memberSunday' && (
                  <span className="absolute top-3 left-3 z-10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#4a5731] rounded-full">
                    {t('sundayBadge')}
                  </span>
                )}
              </div>
              <div className="p-5 shadow-[inset_0_6px_10px_-4px_rgba(0,0,0,0.15)]">
                <h3 className="font-storica font-bold text-gray-900">{t(`${key}.title`)}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{t(`${key}.text`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
