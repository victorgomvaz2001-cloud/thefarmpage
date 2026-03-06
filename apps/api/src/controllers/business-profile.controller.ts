import type { Request, Response, NextFunction } from 'express'
import { businessProfileService } from '../services/business-profile.service'

export async function get(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await businessProfileService.get()
    res.json({ data: profile })
  } catch (err) {
    next(err)
  }
}

export async function upsert(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await businessProfileService.upsert(req.body)
    res.json({ data: profile })
  } catch (err) {
    next(err)
  }
}
