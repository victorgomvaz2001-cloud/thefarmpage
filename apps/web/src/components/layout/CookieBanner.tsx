'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

interface Props {
  message: string
  learnMore: string
  accept: string
  reject: string
}

const COOKIE_NAME = 'cookie_consent'
const COOKIE_DAYS = 30

function getConsent(): string | null {
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + COOKIE_NAME + '=([^;]*)'))
  return match?.[1] ? decodeURIComponent(match[1]) : null
}

function setConsent(value: 'accepted' | 'rejected') {
  const expires = new Date()
  expires.setDate(expires.getDate() + COOKIE_DAYS)
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

export default function CookieBanner({ message, learnMore, accept, reject }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getConsent()) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  function handle(value: 'accepted' | 'rejected') {
    setConsent(value)
    setVisible(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#4a5731] border-t border-[#3a4425] px-4 py-4 shadow-lg">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-white leading-relaxed">
          {message}{' '}
          <Link
            href="/cookies-policy"
            className="underline underline-offset-2 hover:text-white/80 transition-colors whitespace-nowrap"
          >
            {learnMore}
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => handle('rejected')}
            className="text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5 border border-white/30 rounded cursor-pointer"
          >
            {reject}
          </button>
          <button
            onClick={() => handle('accepted')}
            className="text-sm bg-white text-[#4a5731] font-semibold hover:bg-white/90 transition-colors px-4 py-1.5 rounded cursor-pointer"
          >
            {accept}
          </button>
        </div>
      </div>
    </div>
  )
}
