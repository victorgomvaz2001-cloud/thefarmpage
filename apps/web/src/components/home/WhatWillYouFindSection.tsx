'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect, useCallback } from 'react'

const DURATION = 5000

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-900 leading-relaxed">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a5731]" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function PriceIllustration() {
  return (
    <svg viewBox="0 0 280 280" fill="none" aria-hidden="true" className="w-full max-w-[260px] mx-auto">
      <circle cx="140" cy="140" r="120" fill="#4a5731" fillOpacity="0.06" />
      <circle cx="140" cy="140" r="86" fill="#4a5731" fillOpacity="0.05" />
      {/* Tag body */}
      <path
        d="M98 72 L182 72 Q198 72 198 88 L198 162 Q198 178 186 190 L148 228 Q140 236 132 228 L94 190 Q82 178 82 162 L82 88 Q82 72 98 72Z"
        fill="white" stroke="#4a5731" strokeWidth="1.5"
      />
      {/* Hole */}
      <circle cx="168" cy="96" r="9" fill="#f7f6f2" stroke="#4a5731" strokeWidth="1.5" />
      {/* € symbol */}
      <text x="136" y="170" textAnchor="middle" fill="#4a5731" fontSize="62" fontFamily="Georgia, serif" fontWeight="300" opacity="0.75">€</text>
      {/* Decorative dashes */}
      <path d="M108 186 L168 186" stroke="#4a5731" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />
    </svg>
  )
}

function LeafIllustration() {
  return (
    <svg viewBox="0 0 280 280" fill="none" aria-hidden="true" className="w-full max-w-[260px] mx-auto">
      <circle cx="140" cy="140" r="120" fill="#4a5731" fillOpacity="0.06" />
      <circle cx="140" cy="140" r="86" fill="#4a5731" fillOpacity="0.05" />
      {/* Stem */}
      <path d="M140 232 L140 196" stroke="#4a5731" strokeWidth="2" strokeLinecap="round" />
      {/* Main leaf */}
      <path
        d="M140 58 C165 72 196 105 192 148 C188 185 162 208 140 210 C118 208 92 185 88 148 C84 105 115 72 140 58Z"
        fill="#4a5731" fillOpacity="0.14" stroke="#4a5731" strokeWidth="1.5"
      />
      {/* Central vein */}
      <path d="M140 80 L140 196" stroke="#4a5731" strokeWidth="1.2" strokeOpacity="0.4" />
      {/* Side veins */}
      <path d="M140 112 L112 132" stroke="#4a5731" strokeWidth="0.9" strokeOpacity="0.3" />
      <path d="M140 112 L168 132" stroke="#4a5731" strokeWidth="0.9" strokeOpacity="0.3" />
      <path d="M140 142 L108 162" stroke="#4a5731" strokeWidth="0.9" strokeOpacity="0.3" />
      <path d="M140 142 L172 162" stroke="#4a5731" strokeWidth="0.9" strokeOpacity="0.3" />
      {/* Small dots accent */}
      <circle cx="112" cy="132" r="2.5" fill="#4a5731" fillOpacity="0.25" />
      <circle cx="168" cy="132" r="2.5" fill="#4a5731" fillOpacity="0.25" />
      <circle cx="108" cy="162" r="2.5" fill="#4a5731" fillOpacity="0.25" />
      <circle cx="172" cy="162" r="2.5" fill="#4a5731" fillOpacity="0.25" />
    </svg>
  )
}

function CommunityIllustration() {
  return (
    <svg viewBox="0 0 280 280" fill="none" aria-hidden="true" className="w-full max-w-[260px] mx-auto">
      <circle cx="140" cy="140" r="120" fill="#4a5731" fillOpacity="0.06" />
      <circle cx="140" cy="140" r="86" fill="#4a5731" fillOpacity="0.05" />
      {/* Left person */}
      <circle cx="88" cy="112" r="18" fill="#4a5731" fillOpacity="0.12" stroke="#4a5731" strokeWidth="1.5" />
      <path d="M56 188 Q56 158 88 152 Q108 156 115 170" fill="#4a5731" fillOpacity="0.1" stroke="#4a5731" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Right person */}
      <circle cx="192" cy="112" r="18" fill="#4a5731" fillOpacity="0.12" stroke="#4a5731" strokeWidth="1.5" />
      <path d="M224 188 Q224 158 192 152 Q172 156 165 170" fill="#4a5731" fillOpacity="0.1" stroke="#4a5731" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Center person (slightly larger, in front) */}
      <circle cx="140" cy="100" r="24" fill="white" stroke="#4a5731" strokeWidth="1.5" />
      <circle cx="140" cy="100" r="24" fill="#4a5731" fillOpacity="0.18" />
      <path d="M100 188 Q100 150 140 144 Q180 150 180 188" fill="white" stroke="#4a5731" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M100 188 Q100 150 140 144 Q180 150 180 188" fill="#4a5731" fillOpacity="0.15" />
      {/* Connection dots */}
      <path d="M106 127 L118 116" stroke="#4a5731" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 3" />
      <path d="M174 127 L162 116" stroke="#4a5731" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 3" />
    </svg>
  )
}

export default function WhatWillYouFindSection() {
  const t = useTranslations('home.whatWillYouFind')
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)
  const [progressKey, setProgressKey] = useState(0)

  const slides = [
    {
      illustration: <PriceIllustration />,
      title: t('edibles.title'),
      content: (
        <>
          <p className="text-sm text-gray-900 leading-relaxed">{t('edibles.intro')}</p>
          <BulletList items={[t('edibles.item1'), t('edibles.item2'), t('edibles.item3'), t('edibles.item4')]} />
          <p className="mt-3 text-sm text-gray-900 leading-relaxed">{t('edibles.closing')}</p>
        </>
      ),
    },
    {
      illustration: <LeafIllustration />,
      title: t('localStrains.title'),
      content: (
        <>
          <p className="text-sm text-gray-900 leading-relaxed">{t('localStrains.intro')}</p>
          <BulletList items={[t('localStrains.item1'), t('localStrains.item2'), t('localStrains.item3')]} />
        </>
      ),
    },
    {
      illustration: <CommunityIllustration />,
      title: t('community.title'),
      content: (
        <>
          <p className="text-sm text-gray-900 leading-relaxed">{t('community.listIntro')}</p>
          <BulletList items={[t('community.item1'), t('community.item2'), t('community.item3'), t('community.item4')]} />
        </>
      ),
    },
  ]

  const goTo = useCallback((idx: number) => {
    setVisible(false)
    setTimeout(() => {
      setActive(idx)
      setProgressKey(k => k + 1)
      setVisible(true)
    }, 350)
  }, [])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % slides.length)
    }, DURATION)
    return () => clearInterval(timer)
  }, [active, goTo, slides.length])

  return (
    <section className="bg-[#f7f6f2] py-24 px-4 overflow-hidden">
      <div className="mx-auto max-w-5xl">

        {/* Static header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h2 className="font-storica mt-3 text-4xl font-bold tracking-tight text-gray-900">
            {t('title')}
          </h2>
        </div>

        {/* Slide content — fixed height on both mobile and desktop */}
        <div className="relative h-[460px] lg:h-[320px] overflow-hidden">
          {slides.map((slide, i) => {
            const isActive = i === active
            return (
              <div
                key={i}
                aria-hidden={!isActive}
                className="absolute inset-0 transition-all duration-[350ms] ease-in-out"
                style={{
                  opacity: isActive ? (visible ? 1 : 0) : 0,
                  transform: isActive ? (visible ? 'translateY(0)' : 'translateY(10px)') : 'translateY(10px)',
                  pointerEvents: isActive ? 'auto' : 'none',
                  visibility: isActive ? 'visible' : 'hidden',
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-16 h-full">

                  {/* Illustration — 120px on mobile, full width on desktop */}
                  <div className="flex items-center justify-center lg:w-[42%] shrink-0">
                    <div className="w-[120px] lg:w-full lg:max-w-none">
                      {slide.illustration}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="lg:w-[58%]">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5731]/60 mb-3">
                      0{i + 1} / 0{slides.length}
                    </p>
                    <h3 className="font-storica text-3xl font-bold tracking-tight text-gray-900">
                      {slide.title}
                    </h3>
                    <div className="mt-4">
                      {slide.content}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center gap-3 justify-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="relative h-[3px] overflow-hidden rounded-full transition-all duration-300"
              style={{ width: i === active ? 48 : 24 }}
            >
              {/* Track */}
              <span className="absolute inset-0 bg-[#4a5731]/20" />
              {/* Progress fill */}
              {i === active && (
                <span
                  key={progressKey}
                  className="absolute inset-y-0 left-0 bg-[#4a5731] rounded-full"
                  style={{
                    animation: `slideProgress ${DURATION}ms linear forwards`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>


    </section>
  )
}
