import { useTranslations } from 'next-intl'

const ITEMS = ['age', 'membership', 'student', 'legal'] as const

export default function RequirementsSection() {
  const t = useTranslations('home.requirements')

  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h2 className="font-storica mt-3 text-4xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((key) => (
            <div key={key} className={`p-6 ${key === 'student' ? 'bg-[#4a5731] text-white' : 'bg-white'}`}>
              <h3 className={`font-storica font-bold ${key === 'student' ? 'text-white' : 'text-gray-900'}`}>
                {t(`${key}.title`)}
              </h3>
              <p className={`mt-3 text-sm leading-relaxed ${key === 'student' ? 'text-white/80' : 'text-gray-500'}`}>
                {t(`${key}.text`)}
              </p>
              {key === 'student' && (
                <span className="mt-4 inline-block border border-white/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  {t('studentBadge')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
