import 'dotenv/config'
import mongoose from 'mongoose'
import { SEO } from '../models/SEO.model'
import { env } from '../config/env'

const BASE_URL = 'https://www.thefarmsocialclub.com'
const OG_IMAGE = `${BASE_URL}/og-default.jpg`

const HREFLANG_LEGAL = (esPath: string, enPath: string) => ({
  es: `${BASE_URL}${esPath}`,
  en: `${BASE_URL}${enPath}`,
  'x-default': `${BASE_URL}${esPath}`,
})

interface SeedEntry {
  route: string
  title: string
  description: string
  canonical: string
  hreflangEs: string
  hreflangEn: string
}

const seoData: SeedEntry[] = [
  // Privacy Policy - ES
  {
    route: '/privacy-policy',
    title: 'Política de Privacidad | The Farm Social Club',
    description: 'Consulta la política de privacidad de The Farm Social Club. Información sobre el tratamiento de datos personales de los socios y usuarios de nuestra web.',
    canonical: `${BASE_URL}/privacy-policy`,
    hreflangEs: '/privacy-policy',
    hreflangEn: '/en/privacy-policy',
  },
  // Privacy Policy - EN
  {
    route: '/en/privacy-policy',
    title: 'Privacy Policy | The Farm Social Club',
    description: 'Read the privacy policy of The Farm Social Club. Information on how we handle the personal data of members and website users.',
    canonical: `${BASE_URL}/en/privacy-policy`,
    hreflangEs: '/privacy-policy',
    hreflangEn: '/en/privacy-policy',
  },
  // Cookies Policy - ES
  {
    route: '/cookies-policy',
    title: 'Política de Cookies | The Farm Social Club',
    description: 'Consulta la política de cookies de The Farm Social Club. Información sobre el uso de cookies técnicas en nuestra web.',
    canonical: `${BASE_URL}/cookies-policy`,
    hreflangEs: '/cookies-policy',
    hreflangEn: '/en/cookies-policy',
  },
  // Cookies Policy - EN
  {
    route: '/en/cookies-policy',
    title: 'Cookies Policy | The Farm Social Club',
    description: 'Read the cookies policy of The Farm Social Club. Information on the use of technical cookies on our website.',
    canonical: `${BASE_URL}/en/cookies-policy`,
    hreflangEs: '/cookies-policy',
    hreflangEn: '/en/cookies-policy',
  },
  // Legal Notice - ES
  {
    route: '/legal-notice',
    title: 'Aviso Legal | The Farm Social Club',
    description: 'Aviso legal de The Farm Social Club, club social cannábico privado en Vic, Cataluña. Información sobre el titular y las condiciones de uso de la web.',
    canonical: `${BASE_URL}/legal-notice`,
    hreflangEs: '/legal-notice',
    hreflangEn: '/en/legal-notice',
  },
  // Legal Notice - EN
  {
    route: '/en/legal-notice',
    title: 'Legal Notice | The Farm Social Club',
    description: 'Legal notice of The Farm Social Club, a private cannabis social club in Vic, Catalonia. Information about the owner and website terms of use.',
    canonical: `${BASE_URL}/en/legal-notice`,
    hreflangEs: '/legal-notice',
    hreflangEn: '/en/legal-notice',
  },
]

function buildDocument(entry: SeedEntry) {
  return {
    route: entry.route,
    title: entry.title,
    description: entry.description,
    og: {
      title: entry.title,
      description: entry.description,
      image: OG_IMAGE,
      url: entry.canonical,
      type: 'website',
    },
    twitterCard: {
      card: 'summary_large_image' as const,
      title: entry.title,
      description: entry.description,
      image: OG_IMAGE,
    },
    canonical: entry.canonical,
    alternates: {
      languages: HREFLANG_LEGAL(entry.hreflangEs, entry.hreflangEn),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

async function seed() {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(env.MONGODB_URI)

  let created = 0
  let updated = 0

  for (const entry of seoData) {
    const doc = buildDocument(entry)
    const existing = await SEO.findOne({ route: entry.route })

    if (existing) {
      await SEO.findOneAndUpdate({ route: entry.route }, { $set: doc }, { runValidators: true })
      updated++
      console.log(`  updated  ${entry.route}`)
    } else {
      await SEO.create(doc)
      created++
      console.log(`  created  ${entry.route}`)
    }
  }

  console.log(`\nDone - ${created} created, ${updated} updated (${seoData.length} total routes)`)
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
