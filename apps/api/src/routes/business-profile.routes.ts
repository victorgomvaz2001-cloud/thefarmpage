import { Router, type Router as IRouter } from 'express'
import * as businessProfileController from '../controllers/business-profile.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router: IRouter = Router()

// Public — consumed server-side for JSON-LD rendering
router.get('/', businessProfileController.get)

// Admin
router.put('/admin', authMiddleware, businessProfileController.upsert)

export default router
