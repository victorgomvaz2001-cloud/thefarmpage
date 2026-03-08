import { headers } from 'next/headers'
import { fetchSEO } from '@/lib/seo'

export default async function SchemaHead() {
  const h = await headers()
  const pathname = h.get('x-pathname') ?? '/'

  // Normalize locale prefix: /en/foo → /foo for SEO route lookup
  const route = pathname.startsWith('/en') ? pathname.slice(3) || '/' : pathname

  const seo = await fetchSEO(route)
  if (!seo?.schemaMarkup?.length) return null

  return (
    <>
      {seo.schemaMarkup.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', ...schema }),
          }}
        />
      ))}
    </>
  )
}
