import { useTranslations } from 'next-intl'

export default function GetInviteSection() {
  const t = useTranslations('home.getInvite')

  return (
    <section id="invite" className="bg-black py-24 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a8bc7a]">
          {t('label')}
        </span>
        <h2 className="font-storica mt-3 text-4xl font-bold tracking-tight text-white">{t('title')}</h2>
        <p className="mt-6 text-lg text-white/80 leading-relaxed">{t('description')}</p>
        <p className="mt-4 text-sm text-white/60">{t('note')}</p>
        <a
          href="/contact"
          className="mt-10 inline-block bg-white px-10 py-4 text-sm font-semibold uppercase tracking-widest text-[#4a5731] hover:bg-gray-100 transition-colors rounded-full"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  )
}
