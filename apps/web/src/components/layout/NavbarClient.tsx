'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import LanguageSelector from './LanguageSelector'

interface Props {
  home: string
  contact: string
}

export default function NavbarClient({ home, contact }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative border-b border-[#4a5731] bg-[#4a5731]">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Left: brand */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-white"
          >
            THE FARM
          </Link>
        </div>

        {/* Center: desktop links + logo spacer */}
        <div className="flex flex-1 items-center justify-center gap-10">
          <Link
            href="/"
            className="hidden md:block text-sm font-medium text-white hover:text-gray-100"
          >
            {home}
          </Link>

          {/* Spacer — reserves space for the protruding logo */}
          <div className="w-20 md:w-24" />

          <Link
            href="/contact"
            className="hidden md:block text-sm font-medium text-white hover:text-gray-100"
          >
            {contact}
          </Link>
        </div>

        {/* Right: language selector + mobile chevron */}
        <div className="flex items-center gap-3">
          <LanguageSelector />

          <button
            className="md:hidden text-white p-1 focus:outline-none"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
              <span
                className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 origin-center ${
                  open ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
                  open ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 origin-center ${
                  open ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Protruding circular logo — centered, overflows below the navbar */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-10">
          <div className="rounded-full bg-[#4a5731] p-1">
            <Link href="/" aria-label="Ir a la página de inicio">
              <Image
                src="/logo-farm.png"
                alt="The Farm Social Club"
                width={96}
                height={96}
                className="h-14 w-14 md:h-16 md:w-16 rounded-full"
                priority
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-5 pt-10 pb-6">
          <Link
            href="/"
            className="text-sm font-medium text-white hover:text-gray-100"
            onClick={() => setOpen(false)}
          >
            {home}
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-white hover:text-gray-100"
            onClick={() => setOpen(false)}
          >
            {contact}
          </Link>
        </div>
      </div>
    </header>
  )
}
