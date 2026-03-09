import { SEO } from '../models/SEO.model'
import { Sitemap } from '../models/Sitemap.model'
import { env } from '../config/env'

interface SitemapEntry {
  loc: string
  lastmod: string
  canonical?: string
  languages?: Record<string, string>
}

function buildAlternateLinks(entry: SitemapEntry): string {
  const { canonical, languages } = entry
  if (!languages || Object.keys(languages).length === 0) return ''

  const xDefault = canonical ?? entry.loc
  const lines: string[] = []

  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>`)

  for (const [lang, href] of Object.entries(languages)) {
    lines.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
  }

  return '\n' + lines.join('\n')
}

function buildXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(({ loc, lastmod, ...rest }) => {
      const alternates = buildAlternateLinks({ loc, lastmod, ...rest })
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>${alternates}\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>`
}

export class SitemapService {
  async generate() {
    const routes = await SEO.find({}, { route: 1, updatedAt: 1, canonical: 1, alternates: 1 }).lean()
    const siteUrl = env.FRONTEND_URL.replace(/\/$/, '')

    const entries: SitemapEntry[] = routes.map((r) => ({
      loc: `${siteUrl}${r.route}`,
      lastmod: new Date(r.updatedAt).toISOString().split('T')[0]!,
      canonical: r.canonical,
      languages: r.alternates?.languages as Record<string, string> | undefined,
    }))

    const xml = buildXml(entries)
    const generatedAt = new Date()

    await Sitemap.findOneAndUpdate(
      {},
      { xml, generatedAt },
      { upsert: true, new: true },
    )

    return { xml, generatedAt, count: entries.length }
  }

  async get() {
    return Sitemap.findOne().lean()
  }
}

export const sitemapService = new SitemapService()
