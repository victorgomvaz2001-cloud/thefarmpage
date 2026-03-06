import { fetchSEO } from '@/lib/seo'

interface Props {
  route: string
  fallback?: { title?: string; description?: string }
}

export default async function SEOHead({ route, fallback }: Props) {
  const seo = await fetchSEO(route)

  const title = seo?.title ?? fallback?.title
  const description = seo?.description ?? fallback?.description

  const ogTitle = seo?.og?.title || title
  const ogDescription = seo?.og?.description || description
  const twitterTitle = seo?.twitterCard?.title || title
  const twitterDescription = seo?.twitterCard?.description || description

  return (
    <>
      {/* ── Basic ───────────────────────────────────────────── */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {seo?.canonical && <link rel="canonical" href={seo.canonical} />}

      {/* ── Alternates (hreflang) ────────────────────────────── */}
      {seo?.alternates?.languages &&
        Object.entries(seo.alternates.languages).map(([lang, href]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={href} />
        ))}

      {/* ── Robots ──────────────────────────────────────────── */}
      {seo?.robots && (
        <>
          <meta
            name="robots"
            content={[
              seo.robots.index !== false ? 'index' : 'noindex',
              seo.robots.follow !== false ? 'follow' : 'nofollow',
            ].join(', ')}
          />
          {seo.robots.googleBot && (
            <meta
              name="googlebot"
              content={[
                seo.robots.googleBot.index !== false ? 'index' : 'noindex',
                seo.robots.googleBot.follow !== false ? 'follow' : 'nofollow',
              ].join(', ')}
            />
          )}
        </>
      )}

      {/* ── Open Graph ──────────────────────────────────────── */}
      {seo?.og && (
        <>
          {ogTitle && <meta property="og:title" content={ogTitle} />}
          {ogDescription && <meta property="og:description" content={ogDescription} />}
          {seo.og.image && <meta property="og:image" content={seo.og.image} />}
          {seo.og.url && <meta property="og:url" content={seo.og.url} />}
          <meta property="og:type" content={seo.og.type ?? 'website'} />
          {seo.og.locale && <meta property="og:locale" content={seo.og.locale} />}
        </>
      )}

      {/* ── Twitter / X Card ────────────────────────────────── */}
      {seo?.twitterCard && (
        <>
          <meta name="twitter:card" content={seo.twitterCard.card ?? 'summary_large_image'} />
          {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
          {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}
          {seo.twitterCard.image && <meta name="twitter:image" content={seo.twitterCard.image} />}
        </>
      )}

      {/* ── Schema Markup (JSON-LD) ──────────────────────────── */}
      {seo?.schemaMarkup?.map((schema, i) => (
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
