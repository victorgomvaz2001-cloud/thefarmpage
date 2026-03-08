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
            <p className="mt-4 text-gray-500 leading-relaxed">{t('listIntro')}</p>
            <ul className="mt-3 space-y-2">
              {(['listItem1', 'listItem2', 'listItem3'] as const).map((key) => (
                <li key={key} className="flex items-start gap-2 text-gray-500 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a5731]" />
                  {t(key)}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-500 leading-relaxed">{t('closing')}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 h-96">
            <div className="relative overflow-hidden">
              <Image
                src="https://cavidasthefarm.s3.eu-north-1.amazonaws.com/place.webp"
                alt="The Farm Social Club"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="https://cavidasthefarm.s3.eu-north-1.amazonaws.com/local.webp"
                alt="The Farm Social Club"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
