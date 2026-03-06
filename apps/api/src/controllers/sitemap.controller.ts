import type { Request, Response, NextFunction } from 'express'
import { sitemapService } from '../services/sitemap.service'

export async function generate(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await sitemapService.generate()
    res.json({ data: { generatedAt: result.generatedAt, count: result.count } })
  } catch (err) {
    next(err)
  }
}

export async function getXml(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const sitemap = await sitemapService.get()
    if (!sitemap) {
      res.status(404).json({ error: 'Sitemap not generated yet' })
      return
    }
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.send(sitemap.xml)
  } catch (err) {
    next(err)
  }
}

export async function getMeta(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const sitemap = await sitemapService.get()
    res.json({ data: sitemap ? { generatedAt: sitemap.generatedAt } : null })
  } catch (err) {
    next(err)
  }
}
