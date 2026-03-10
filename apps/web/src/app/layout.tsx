import { getLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import localFont from 'next/font/local'
import Script from 'next/script'
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VGFL5FNR24"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VGFL5FNR24');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
