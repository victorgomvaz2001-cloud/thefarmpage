export const dynamic = 'force-dynamic'

import { getTranslations, getLocale } from 'next-intl/server'
import SEOHead from '@/components/SEOHead'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import EventsSection from '@/components/home/EventsSection'
import GetInviteSection from '@/components/home/GetInviteSection'
import ClubRulesSection from '@/components/home/ClubRulesSection'
import InviteProcessSection from '@/components/home/InviteProcessSection'
import RequirementsSection from '@/components/home/RequirementsSection'
import FAQSection from '@/components/home/FAQSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export default async function HomePage() {
  const locale = await getLocale()
  const t = await getTranslations('home')
  const seoRoute = locale === 'es' ? '/' : `/${locale}`

  return (
    <>
      <SEOHead route={seoRoute} fallback={{ title: t('title') }} />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GetInviteSection />
      <ClubRulesSection />
      <InviteProcessSection />
      <RequirementsSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
