import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('home.hero')

  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <Image
        src="https://picsum.photos/seed/thefarm-hero/1920/1080"
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-[#1a2010]/75" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#a8bc7a]">
          {t('label')}
        </span>
        <h1 className="font-storica text-5xl font-bold tracking-tight text-white md:text-7xl leading-tight">
          {t('headline')}
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">{t('subheadline')}</p>
        <a
          href="#invite"
          className="mt-10 inline-block bg-[#4a5731] px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white hover:bg-[#3a4425] transition-colors rounded-full"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  )
}
