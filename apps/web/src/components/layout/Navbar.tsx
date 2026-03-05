import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import LanguageSelector from './LanguageSelector'

export default async function Navbar() {
  const t = await getTranslations('nav')

  return (
    <header className="border-b border-[#4a5731] bg-[#4a5731]">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-white"
          >
            THE FARM
          </Link>
        </div>

        <div className="relative flex flex-1 items-center justify-center gap-10">
          <Link
            href="/"
            className="text-sm font-medium text-white hover:text-gray-100"
          >
            {t('home')}
          </Link>

          <div className="relative flex items-center justify-center">
            <div className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-28 -translate-x-1/2 rounded-t-full bg-[#4a5731]" />
            <Link href="/" aria-label="Ir a la página de inicio" className="relative z-10">
              <Image
                src="/logo-farm.png"
                alt="The Farm Social Club"
                width={96}
                height={96}
                className="h-14 w-14 md:h-16 md:w-16 rounded-full"
                priority
              />
            </Link>
          </div>

          <Link
            href="/contact"
            className="text-sm font-medium text-white hover:text-gray-100"
          >
            {t('contact')}
          </Link>
        </div>

        <LanguageSelector />
      </nav>
    </header>
  )
}
