import { useTranslations } from 'next-intl'
import InviteProcessSection from './InviteProcessSection'
import RequirementsSection from './RequirementsSection'

export default function HowToJoinSection() {
  const t = useTranslations('home.howToJoin')

  return (
    <section>
      <div className="bg-white py-16 px-4 text-center">
        <h2 className="font-storica text-4xl font-bold tracking-tight text-gray-900">
          {t('title')}
        </h2>
      </div>
      <InviteProcessSection />
      <RequirementsSection />
    </section>
  )
}
