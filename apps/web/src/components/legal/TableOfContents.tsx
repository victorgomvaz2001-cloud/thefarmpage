'use client'

import { useState, useEffect } from 'react'

interface Section {
  id: string
  title: string
}

interface Props {
  sections: Section[]
  label: string
}

export default function TableOfContents({ sections, label }: Props) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '')

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(id)
        },
        { rootMargin: '-10% 0px -75% 0px' },
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach((obs) => obs?.disconnect())
  }, [sections])

  function handleClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="sticky top-28">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#4a5731]">
        {label}
      </p>
      <ul className="space-y-1 border-l border-gray-200">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <button
              onClick={() => handleClick(id)}
              className={`block w-full py-1 pl-4 text-left text-sm transition-all duration-200 ${
                active === id
                  ? '-ml-px border-l-2 border-[#4a5731] pl-[14px] font-semibold text-[#4a5731]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
