'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

const FAQS = ['invitation', 'membership', 'guest', 'documents', 'hours', 'edibles', 'student'] as const

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`
        overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer
        ${open
          ? 'border-[#4a5731] shadow-[0_0_0_3px_rgba(74,87,49,0.15)]'
          : 'border-gray-200 hover:border-[#4a5731] hover:shadow-[0_0_0_3px_rgba(74,87,49,0.1)]'
        }
      `}
    >
      <button
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <span
          className={`ml-4 shrink-0 text-[#4a5731] text-xl font-light transition-transform duration-300 ${open ? 'rotate-45' : 'rotate-0'}`}
        >
          +
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight ?? 300}px` : '0px',
          opacity: open ? 1 : 0,
        }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const t = useTranslations('home.faq')

  return (
    <section className="bg-white py-24 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
        </div>
        <dl className="mt-16 space-y-3">
          {FAQS.map((key) => (
            <FAQItem
              key={key}
              question={t(`${key}.question`)}
              answer={t(`${key}.answer`)}
            />
          ))}
        </dl>
      </div>
    </section>
  )
}
