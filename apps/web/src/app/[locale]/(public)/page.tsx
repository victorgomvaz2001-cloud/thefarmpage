export const dynamic = 'force-dynamic'

import lazy from 'next/dynamic'
import { getTranslations, getLocale } from 'next-intl/server'
import SEOHead from '@/components/SEOHead'
import HeroSection from '@/components/home/HeroSection'

const AboutSection         = lazy(() => import('@/components/home/AboutSection'))
const EventsSection        = lazy(() => import('@/components/home/EventsSection'))
const GetInviteSection     = lazy(() => import('@/components/home/GetInviteSection'))
const ClubRulesSection     = lazy(() => import('@/components/home/ClubRulesSection'))
const InviteProcessSection = lazy(() => import('@/components/home/InviteProcessSection'))
const RequirementsSection  = lazy(() => import('@/components/home/RequirementsSection'))
const FAQSection           = lazy(() => import('@/components/home/FAQSection'))
const FinalCTASection      = lazy(() => import('@/components/home/FinalCTASection'))

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
