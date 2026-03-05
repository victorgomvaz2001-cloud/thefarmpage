'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'

export default function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: 'es' })}
        className={
          locale === 'es'
            ? 'text-white'
            : 'text-white/60 hover:text-white'
        }
        aria-current={locale === 'es' ? 'page' : undefined}
      >
        ES
      </button>
      <span className="text-white/40">|</span>
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: 'en' })}
        className={
          locale === 'en'
            ? 'text-white'
            : 'text-white/60 hover:text-white'
        }
        aria-current={locale === 'en' ? 'page' : undefined}
      >
        EN
      </button>
    </div>
  )
}
