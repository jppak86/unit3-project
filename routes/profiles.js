import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/profiles/
/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', profilesCtrl.index)

export { router }
