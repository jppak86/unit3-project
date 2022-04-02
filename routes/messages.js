import { Router } from 'express'
import * as messagesCtrl from '../controllers/messages.js'
const router = Router()

// index
router.get('/', messagesCtrl.index)

// create
router.post('/', messagesCtrl.create)

// update
router.put('/:id', messagesCtrl.update)

// delete
router.delete('/:id', messagesCtrl.delete)

// show
router.get('/:id', messagesCtrl.show)

export {
  router
}
