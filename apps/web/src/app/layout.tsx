import { headers } from 'next/headers'
import type { ReactNode } from 'react'
import localFont from 'next/font/local'
import './globals.css'

const storica = localFont({
  src: [
    { path: '../fonts/Storica-Light.ttf',   weight: '300', style: 'normal' },
    { path: '../fonts/Storica-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/Storica-Medium.ttf',  weight: '500', style: 'normal' },
    { path: '../fonts/Storica-Bold.ttf',    weight: '700', style: 'normal' },
  ],
  variable: '--font-storica',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headersList = await headers()
  const locale = headersList.get('x-next-intl-locale') ?? 'es'

  return (
    <html lang={locale} className={storica.variable}>
      <body>{children}</body>
    </html>
  )
}
