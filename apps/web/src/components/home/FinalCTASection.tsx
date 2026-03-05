import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function FinalCTASection() {
  const t = useTranslations('home.finalCta')

  return (
    <section className="relative py-32 px-4">
      <Image
        src="https://picsum.photos/seed/thefarm-cta/1920/600"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#1a2010]/80" />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{t('title')}</h2>
        <p className="mt-6 text-lg text-white/80 leading-relaxed">{t('description')}</p>
        <a
          href="/contact"
          className="mt-10 inline-block bg-[#4a5731] px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white hover:bg-[#3a4425] transition-colors rounded-full"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  )
}
