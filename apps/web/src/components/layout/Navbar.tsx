import { getTranslations } from 'next-intl/server'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
  const t = await getTranslations('nav')
  return <NavbarClient home={t('home')} contact={t('contact')} />
}
