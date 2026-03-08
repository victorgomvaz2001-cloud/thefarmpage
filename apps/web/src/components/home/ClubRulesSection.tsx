import { useTranslations } from 'next-intl'

const RULES = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8'] as const

export default function ClubRulesSection() {
  const t = useTranslations('home.clubRules')

  return (
    <section className="bg-[#f7f6f2] py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h2 className="font-storica mt-3 text-4xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
          <p className="mt-6 text-gray-700 max-w-2xl mx-auto leading-relaxed">{t('intro')}</p>
        </div>

        <ul className="flex flex-col gap-3">
          {RULES.map((r, i) => (
            <li key={r} className="bg-white p-6 flex items-start gap-4">
              <span className="text-xs font-bold text-[#4a5731] shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm text-gray-600 leading-relaxed">{t(r)}</p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
