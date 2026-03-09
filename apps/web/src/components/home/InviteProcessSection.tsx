'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import InviteSlideshowClient from './InviteSlideshowClient'

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const
const STEP_IMAGES = [
  'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/process1.webp',
  'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/process2.webp',
  'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/process3.webp',
  'https://cavidasthefarm.s3.eu-north-1.amazonaws.com/process4.webp',
]
/** object-position per image: step 3 = show more right (message), step 4 = show more left (both people) */
const STEP_OBJECT_POSITIONS = [undefined, undefined, '75% 75%', '20% center'] as (string | undefined)[]

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

  const stepAlts = STEPS.map((key) => t(`${key}.title`))

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Desktop: image slideshow — absolute, full height, flush to right edge */}
      <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2">
        <InviteSlideshowClient
          images={STEP_IMAGES}
          alts={stepAlts}
          activeIndex={activeStep}
          objectPositions={STEP_OBJECT_POSITIONS}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="lg:w-1/2 lg:pr-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h3 className="font-storica mt-3 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">{t('title')}</h3>

          {/* Mobile: image below title, full bleed */}
          <div className="lg:hidden mt-8 -mx-4 relative h-56 overflow-hidden">
            <InviteSlideshowClient
              images={STEP_IMAGES}
              alts={stepAlts}
              activeIndex={activeStep}
              gradient={false}
              objectPositions={STEP_OBJECT_POSITIONS}
            />
          </div>

          <ol className="mt-10 lg:mt-16">
            {STEPS.map((key, i) => (
              <li key={key} className="flex gap-4 lg:gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <button
                    onClick={() => handleStepClick(i)}
                    aria-label={t(`${key}.title`)}
                    className={`flex h-10 w-10 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 cursor-pointer
                      ${activeStep === i
                        ? 'bg-[#4a5731] text-white shadow-lg shadow-[#4a5731]/40 ring-4 ring-[#a8bc7a] ring-offset-2'
                        : 'bg-[#4a5731]/20 text-[#4a5731] hover:bg-[#4a5731]/40'
                      }`}
                  >
                    {i + 1}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="w-[3px] grow bg-[#4a5731]/30" />
                  )}
                </div>
                <div className={`pt-1.5 lg:pt-2 ${i < STEPS.length - 1 ? 'pb-8 lg:pb-10' : ''}`}>
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
