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

router.post('/:id/comments', checkAuth, messagesCtrl.createComment)
// router.put('/:id/comments/:commentId', checkAuth, messagesCtrl.editComment)

router.delete('/:id/comments/:commentId', checkAuth, messagesCtrl.deleteComment)


export {
  router
}
