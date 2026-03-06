import Image from 'next/image'
import { useTranslations } from 'next-intl'

const PILLARS = ['edibles', 'cultivation', 'community'] as const

export default function AboutSection() {
  const t = useTranslations('home.about')

  return (
    <section id="about" className="bg-white py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
              {t('label')}
            </span>
            <h2 className="font-storica mt-3 text-4xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">{t('description')}</p>
            <p className="mt-4 text-gray-500">{t('description2')}</p>
          </div>
          <div className="relative h-96 overflow-hidden">
            <Image
              src="https://picsum.photos/seed/thefarm-about/800/600"
              alt="The Farm Social Club"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {PILLARS.map((key) => (
            <div key={key} className="border-t-2 border-[#4a5731] pt-6">
              <h3 className="font-storica text-lg font-bold text-gray-900">{t(`${key}.title`)}</h3>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">{t(`${key}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
