import { SEO } from '../models/SEO.model'
import { Sitemap } from '../models/Sitemap.model'
import { env } from '../config/env'

function buildXml(entries: { loc: string; lastmod: string }[]): string {
  const urls = entries
    .map(
      ({ loc, lastmod }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
}

export class SitemapService {
  async generate() {
    const routes = await SEO.find({}, { route: 1, updatedAt: 1 }).lean()
    const siteUrl = env.FRONTEND_URL.replace(/\/$/, '')

    const entries = routes.map((r) => ({
      loc: `${siteUrl}${r.route}`,
      lastmod: new Date(r.updatedAt).toISOString().split('T')[0]!,
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
