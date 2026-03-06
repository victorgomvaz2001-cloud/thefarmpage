'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const EVENTS = [
  { key: 'edibleTasting', src: 'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/edibles.webp' },
  { key: 'poker',         src: 'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/poker.webp' },
  { key: 'playstation',   src: 'https://picsum.photos/seed/thefarm-gaming/600/400' },
  { key: 'memberSunday',  src: 'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/member.webp' },
] as const

export default function EventsSection() {
  const t = useTranslations('home.events')
  const [active, setActive] = useState<number | null>(null)

  const gridCols = active === null
    ? '4fr 1fr 1fr 1fr 1fr'
    : `1fr ${EVENTS.map((_, i) => i === active ? '4fr' : '1fr').join(' ')}`

  return (
    <section className="overflow-hidden">

      {/* ── Desktop ─────────────────────────────────────────────────────── */}
      <div
        className="hidden lg:grid h-[600px]"
        style={{
          gridTemplateColumns: gridCols,
          transition: 'grid-template-columns 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Title column */}
        <div className="bg-[#4a5731] relative overflow-hidden">
          {/* Horizontal state — fixed width so text doesn't reflow as column shrinks */}
          <div
            className={`absolute top-0 left-0 bottom-0 w-[480px] flex flex-col justify-center px-12 ${active !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{
              transition: 'opacity 300ms',
              transitionDelay: active !== null ? '0ms' : '400ms',
            }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a8bc7a]">{t('label')}</span>
            <h2 className="font-storica mt-3 text-4xl font-bold text-white">{t('title')}</h2>
            <p className="mt-4 text-white/70 leading-relaxed">{t('description')}</p>
          </div>
          {/* Vertical state */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${active !== null ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{
              transition: 'opacity 300ms',
              transitionDelay: active !== null ? '300ms' : '0ms',
            }}
          >
            <span
              className="font-storica font-bold text-white text-xl tracking-widest"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {t('title')}
            </span>
          </div>
        </div>

        {/* Event columns */}
        {EVENTS.map(({ key, src }, i) => {
          const isActive = active === i
          return (
            <div
              key={key}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => setActive(isActive ? null : i)}
            >
              <Image
                src={src}
                alt={t(`${key}.title`)}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-[#1a2010]/55' : 'bg-black/60 group-hover:bg-black/45'}`} />

              {/* Collapsed: horizontal name centered */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <span className="font-storica font-bold text-white text-sm tracking-widest text-center px-2">
                  {t(`${key}.title`)}
                </span>
              </div>

              {/* Expanded: content */}
              <div className={`absolute inset-0 flex flex-col justify-end p-10 transition-opacity duration-300 ${isActive ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a8bc7a] mb-3">{t('label')}</span>
                <h3 className="font-storica text-3xl font-bold text-white mb-3">{t(`${key}.title`)}</h3>
                <p className="text-white/80 leading-relaxed max-w-lg text-sm">{t(`${key}.text`)}</p>
                {key === 'memberSunday' && (
                  <span className="mt-4 inline-block bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#4a5731] rounded-full w-fit">
                    {t('sundayBadge')}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Mobile ──────────────────────────────────────────────────────── */}
      <div className="lg:hidden">
        <div className="bg-[#4a5731] px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a8bc7a]">{t('label')}</span>
          <h2 className="font-storica mt-3 text-3xl font-bold text-white">{t('title')}</h2>
          <p className="mt-4 text-white/70 leading-relaxed">{t('description')}</p>
        </div>

        {EVENTS.map(({ key, src }, i) => {
          const isActive = active === i
          return (
            <div key={key}>
              <button
                className="relative w-full h-16 flex items-center px-6 overflow-hidden"
                onClick={() => setActive(isActive ? null : i)}
              >
                <Image src={src} alt="" fill sizes="100vw" className="object-cover brightness-[0.35]" />
                <span className="relative z-10 font-storica font-bold text-white">{t(`${key}.title`)}</span>
                <span className={`relative z-10 ml-auto text-white/70 text-xs transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-80' : 'max-h-0'}`}>
                <div className="relative h-64">
                  <Image src={src} alt={t(`${key}.title`)} fill sizes="100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-[#1a2010]/60 flex flex-col justify-end p-6">
                    <p className="text-white/80 text-sm leading-relaxed">{t(`${key}.text`)}</p>
                    {key === 'memberSunday' && (
                      <span className="mt-3 inline-block bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#4a5731] rounded-full w-fit">
                        {t('sundayBadge')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}
