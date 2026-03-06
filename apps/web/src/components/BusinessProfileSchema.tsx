import type { IBusinessProfile } from '@falcanna/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'

async function fetchBusinessProfile(): Promise<IBusinessProfile | null> {
  try {
    const res = await fetch(`${API_URL}/business-profile`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

export default async function BusinessProfileSchema() {
  const profile = await fetchBusinessProfile()
  if (!profile) return null

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': profile.type || 'LocalBusiness',
    name: profile.name,
  }

  if (profile.description) schema.description = profile.description
  if (profile.url) schema.url = profile.url
  if (profile.telephone) schema.telephone = profile.telephone
  if (profile.email) schema.email = profile.email
  if (profile.image) schema.image = profile.image
  if (profile.priceRange) schema.priceRange = profile.priceRange
  if (profile.openingHours?.length) schema.openingHours = profile.openingHours
  if (profile.sameAs?.length) schema.sameAs = profile.sameAs

  if (profile.address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...profile.address,
    }
  }

  if (profile.geo?.latitude != null && profile.geo?.longitude != null) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: profile.geo.latitude,
      longitude: profile.geo.longitude,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
