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
        className={`transition-opacity ${locale === 'es' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
        aria-current={locale === 'es' ? 'page' : undefined}
        aria-label="Español"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5" className="w-5 h-5" aria-hidden="true">
          <defs>
            <clipPath id="spain-flag">
              <path d="M0 38h38V0H0v38Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#spain-flag)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path fill="#dd2e44" d="M37 10a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V10Z" />
            <path fill="#ffcc4d" d="M37 13H1v12h36V13Z" />
            <path fill="#ea596e" d="M10 20v-3a3 3 0 1 1 6 0v3h-6Z" />
            <path fill="#f4a2b2" d="M13 18h3v3h-3v-3z" />
            <path fill="#dd2e44" d="M13 18h-3v3h3v-3z" />
            <path fill="#ea596e" d="M16 22.5c0-.829-1.343-1.5-3-1.5s-3 .671-3 1.5 1.343 1.5 3 1.5 3-.671 3-1.5" />
            <path fill="#ffac33" d="M16 23.25c0 .414-1.343.75-3 .75s-3-.336-3-.75 1.343-.75 3-.75 3 .336 3 .75" />
            <path fill="#99aab5" d="M8 14h1v7H8v-7zm10 0h-1v7h1v-7z" />
            <path fill="#66757f" d="M10 14H7v1h3v-1zm9 0h-3v1h3v-1zM9 21H8v1h1v-1zm9 0h-1v1h1v-1z" />
          </g>
        </svg>
      </button>
      <span className="text-white/40">|</span>
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: 'en' })}
        className={`transition-opacity ${locale === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
        aria-current={locale === 'en' ? 'page' : undefined}
        aria-label="English"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5" className="w-5 h-5" aria-hidden="true">
          <defs>
            <clipPath id="uk-flag">
              <path d="M0 38h38V0H0v38Z" />
            </clipPath>
          </defs>
          <path fill="#269" d="M1.25 12.575v4.926h7.035L1.25 12.575ZM7.08 40H17.5v-7.296L7.08 40ZM30 32.705V40h10.419L30 32.705ZM1.25 30v4.926L8.287 30H1.25ZM40.421 7.5H30v7.296L40.421 7.5ZM46.25 34.928V30h-7.039l7.039 4.928ZM46.25 17.5v-4.926L39.214 17.5h7.036ZM17.5 7.5H7.08l10.42 7.296V7.5Z" />
          <g clipPath="url(#uk-flag)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path fill="#dd2e44" d="m26.14 14 9.712-6.801c.471.48.808 1.082.99 1.749L29.627 14H26.14ZM14 14h-2.141L2.148 7.2a3.991 3.991 0 0 1 1.938-1.085L14 13.057V14ZM24 24h2.141l9.711 6.8a3.993 3.993 0 0 1-1.937 1.085L24 24.943V24ZM11.859 24l-9.711 6.8a3.994 3.994 0 0 1-.991-1.749L8.372 24h3.487Z" />
            <path fill="#eee" d="M37 16H22V6h2v5.836L32.335 6H33a3.99 3.99 0 0 1 2.852 1.199L26.14 14h3.487l7.215-5.052c.093.337.158.686.158 1.052v.058L31.369 14H37v2ZM1 16v-2h5.63L1 10.059V10c0-1.091.439-2.078 1.148-2.8l9.711 6.8H14v-.943L4.086 6.115C4.38 6.046 4.684 6 5 6h.664L14 11.837V6h2v10H1ZM37 28a3.983 3.983 0 0 1-1.148 2.8L26.141 24H24v.943l9.915 6.942A4.001 4.001 0 0 1 33 32h-.663L24 26.163V32h-2V22h15v2h-5.629L37 27.941V28ZM14 32v-5.837L5.664 32H5a3.985 3.985 0 0 1-2.852-1.2l9.711-6.8H8.372l-7.215 5.051A3.968 3.968 0 0 1 1 28v-.059L6.628 24H1v-2h15v10h-2z" />
            <path fill="#dd2e44" d="M22 22v10h-6V22H1v-6h15V6h6v10h15v6H22z" />
          </g>
        </svg>
      </button>
    </div>
  )
}
