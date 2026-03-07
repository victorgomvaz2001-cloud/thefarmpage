export const dynamic = 'force-dynamic'

import type { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBannerWrapper from '@/components/layout/CookieBannerWrapper'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBannerWrapper />
    </>
  )
}
