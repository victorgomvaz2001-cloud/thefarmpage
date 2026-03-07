import { getTranslations } from 'next-intl/server'
import CookieBanner from './CookieBanner'

export default async function CookieBannerWrapper() {
  const t = await getTranslations('cookieBanner')

  return (
    <CookieBanner
      message={t('message')}
      learnMore={t('learnMore')}
      accept={t('accept')}
      reject={t('reject')}
    />
  )
}
