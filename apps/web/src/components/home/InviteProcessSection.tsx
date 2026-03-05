import { useTranslations } from 'next-intl'

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const

export default function InviteProcessSection() {
  const t = useTranslations('home.inviteProcess')

  return (
    <section className="bg-white py-24 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
        </div>
        <ol className="mt-16 space-y-10">
          {STEPS.map((key, i) => (
            <li key={key} className="flex items-start gap-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4a5731] text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="pt-2">
                <h3 className="font-bold text-gray-900">{t(`${key}.title`)}</h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">{t(`${key}.text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
