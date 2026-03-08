import { useTranslations } from 'next-intl'
import InviteProcessSection from './InviteProcessSection'
import RequirementsSection from './RequirementsSection'

export default function HowToJoinSection() {
  const t = useTranslations('home.howToJoin')

  return (
    <section>
      <div className="bg-[#1a2210] py-24 px-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a8bc7a]">
          {t('label')}
        </span>
        <h2 className="font-storica mt-3 text-4xl font-bold tracking-tight text-white">
          {t('title')}
        </h2>
        <div className="mt-6 h-px w-12 bg-[#a8bc7a]/40 mx-auto" />
      </div>
      <InviteProcessSection />
      <RequirementsSection />
    </section>
  )
}
