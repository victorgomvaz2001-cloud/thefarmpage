import Image from 'next/image'
import { useTranslations } from 'next-intl'

const EVENTS = [
  { key: 'edibleTasting', seed: 'thefarm-edibles' },
  { key: 'poker', seed: 'thefarm-poker' },
  { key: 'playstation', seed: 'thefarm-gaming' },
  { key: 'memberSunday', seed: 'thefarm-sunday' },
] as const

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
          {EVENTS.map(({ key, seed }) => (
            <div key={key} className="bg-white overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${seed}/600/400`}
                  alt={t(`${key}.title`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-storica font-bold text-gray-900">{t(`${key}.title`)}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{t(`${key}.text`)}</p>
                {key === 'memberSunday' && (
                  <span className="mt-3 inline-block bg-[#4a5731] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    {t('sundayBadge')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
