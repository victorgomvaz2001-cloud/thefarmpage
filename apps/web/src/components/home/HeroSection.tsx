import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('home.hero')

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#1a2010]">
      <video
        src="https://cavidasthefarm.s3.eu-north-1.amazonaws.com/hero+horizontal.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#1a2010]/75" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-32">
        <h1 className="font-storica text-5xl font-bold tracking-tight text-white md:text-7xl leading-tight">
          {t('headline1')}
          <span className="block text-white">·</span>
          {t('headline2')}
        </h1>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">{t('subheadline1')}</p>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">{t('subheadline2')}</p>
        <a
          href="#invite"
          className="mt-12 inline-block bg-[#a8bc7a] px-14 py-5 text-base font-bold uppercase tracking-widest text-[#1a2010] hover:bg-[#b8cc8a] transition-colors rounded-full shadow-lg shadow-black/30"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  )
}
