'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import InviteSlideshowClient from './InviteSlideshowClient'

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const
const STEP_IMAGES = [
  'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/edibles.webp',
  'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/poker.webp',
  'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/member.webp',
  'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/edibles.webp',
]

export default function InviteProcessSection() {
  const t = useTranslations('home.inviteProcess')
  const [activeStep, setActiveStep] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveStep((s) => (s + 1) % STEPS.length)
    }, 8000)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const handleStepClick = (i: number) => {
    setActiveStep(i)
    startTimer()
  }

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Right: image slideshow — absolute, full height, flush to right edge */}
      <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2">
        <InviteSlideshowClient
          images={STEP_IMAGES}
          alts={STEPS.map((key) => t(`${key}.title`))}
          activeIndex={activeStep}
        />
      </div>

      {/* Left: content */}
      <div className="relative mx-auto max-w-6xl px-4 py-24">
        <div className="lg:w-1/2 lg:pr-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h2 className="font-storica mt-3 text-5xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
          <ol className="mt-16">
            {STEPS.map((key, i) => (
              <li key={key} className="flex items-start gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <button
                    onClick={() => handleStepClick(i)}
                    aria-label={t(`${key}.title`)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 cursor-pointer
                      ${activeStep === i
                        ? 'bg-[#4a5731] text-white scale-110 shadow-lg shadow-[#4a5731]/40 ring-4 ring-[#a8bc7a] ring-offset-2'
                        : 'bg-[#4a5731]/20 text-[#4a5731] hover:bg-[#4a5731]/40'
                      }`}
                  >
                    {i + 1}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="mt-1 w-[3px] flex-1 min-h-[2.5rem] rounded-full bg-[#4a5731]/30" />
                  )}
                </div>
                <div className={`pt-2 ${i < STEPS.length - 1 ? 'pb-10' : ''}`}>
                  <h3 className={`font-storica font-bold transition-colors duration-300 ${activeStep === i ? 'text-[#4a5731]' : 'text-gray-900'}`}>
                    {t(`${key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{t(`${key}.text`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
