import { getLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import localFont from 'next/font/local'
import BusinessProfileSchema from '@/components/BusinessProfileSchema'
import SchemaHead from '@/components/SchemaHead'
import './globals.css'

const storica = localFont({
  src: [
    { path: '../fonts/Storica-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Storica-Bold.woff2',   weight: '700', style: 'normal' },
  ],
  variable: '--font-storica',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale().catch(() => 'es')

  return (
    <html lang={locale} className={storica.variable}>
      <head>
        <BusinessProfileSchema />
        <SchemaHead />
      </head>
      <body>{children}</body>
    </html>
  )
}
