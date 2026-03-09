export const dynamic = 'force-dynamic'

import { getTranslations, getLocale } from 'next-intl/server'
import SEOHead from '@/components/SEOHead'

export default async function ContactPage() {
  const locale = await getLocale()
  const t = await getTranslations('contact')
  const seoRoute = locale === 'es' ? '/contact' : `/${locale}/contact`

  return (
    <div className="min-h-screen bg-[#f7f6f2]">
      <SEOHead route={seoRoute} fallback={{ title: t('title') }} />

      {/* Hero header */}
      <div className="bg-[#1a2210] py-20 px-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a8bc7a]">
          {t('label')}
        </span>
        <h1 className="font-storica mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-white/70 max-w-xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-16 space-y-10">

        {/* Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Location */}
          <div className="bg-white p-8 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4a5731]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#4a5731]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <h2 className="font-storica font-bold text-gray-900 text-sm uppercase tracking-wide">{t('location.title')}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{t('location.address')}</p>
            <a
              href="https://maps.app.goo.gl/fHuaBqApfM3b1aLi8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-xs font-semibold text-[#4a5731] hover:underline"
            >
              {t('location.directions')} →
            </a>
          </div>

          {/* Hours */}
          <div className="bg-white p-8 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4a5731]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#4a5731]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h2 className="font-storica font-bold text-gray-900 text-sm uppercase tracking-wide">{t('hours.title')}</h2>
            <div className="text-sm text-gray-700 leading-relaxed space-y-1">
              <p>{t('hours.days')}</p>
              <p className="font-semibold text-gray-900">{t('hours.time')}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white p-8 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-[#4a5731]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#4a5731]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </div>
            <h2 className="font-storica font-bold text-gray-900 text-sm uppercase tracking-wide">{t('contact.title')}</h2>

            {/* WhatsApp */}
            <a
              href="https://wa.me/34618384682"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#4a5731] transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +34 618 384 682
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/thefarmsocialclubvic/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#4a5731] transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @thefarmsocialclubvic
            </a>
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="overflow-hidden bg-white shadow-sm">
          <iframe
            title="The Farm Social Club - Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.123456789!2d2.2534!3d41.9302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a517b6e9a5f4d7%3A0x1234567890abcdef!2sCarrer%20de%20Francesc%20Pla%20el%20Vigat%C3%A0%2C%2014%2C%20Vic!5e0!3m2!1ses!2ses!4v1234567890"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  )
}
