import { Router } from 'express'
import * as messagesCtrl from '../controllers/messages.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// index
router.get('/', messagesCtrl.index)




// show
router.get('/:id', messagesCtrl.show)

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)

router.post('/', checkAuth,  messagesCtrl.create)

router.put('/:id', checkAuth, messagesCtrl.update)

router.delete('/:id', checkAuth, messagesCtrl.delete)



export {
  router
}
