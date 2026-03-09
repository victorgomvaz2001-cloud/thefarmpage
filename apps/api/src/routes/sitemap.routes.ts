import { Router, type Router as IRouter } from 'express'
import * as sitemapController from '../controllers/sitemap.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router: IRouter = Router()

// Public - consumed by Next.js route handler and bots
router.get('/xml', sitemapController.getXml)
router.get('/meta', sitemapController.getMeta)

// Admin
router.post('/admin/generate', authMiddleware, sitemapController.generate)

export default router
