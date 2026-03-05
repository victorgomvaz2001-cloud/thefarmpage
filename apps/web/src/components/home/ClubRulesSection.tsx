import { useTranslations } from 'next-intl'

const GROUPS = [
  { key: 'access', rules: ['r1', 'r2'] },
  { key: 'consumption', rules: ['r1', 'r2', 'r3', 'r4'] },
  { key: 'coexistence', rules: ['r1', 'r2', 'r3', 'r4', 'r5'] },
  { key: 'activities', rules: ['r1', 'r2'] },
  { key: 'responsibility', rules: ['r1', 'r2'] },
  { key: 'breach', rules: ['r1', 'r2'] },
] as const

export default function ClubRulesSection() {
  const t = useTranslations('home.clubRules')

  return (
    <section className="bg-[#f7f6f2] py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto leading-relaxed">{t('intro')}</p>
        </div>

        <div className="flex flex-col gap-6">
          {GROUPS.map(({ key, rules }, i) => (
            <div key={key} className="bg-white p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold text-[#4a5731]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm">
                  {t(`${key}.title`)}
                </h3>
              </div>
              <ul className="space-y-2">
                {rules.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-gray-500 leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#4a5731]" />
                    {t(`${key}.${r}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 italic leading-relaxed max-w-2xl mx-auto">
          {t('closing')}
        </p>
      </div>
    </section>
  )
}
