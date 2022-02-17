import { Router } from 'express'
import memeController from '../controllers/memeController'
import { wrap } from '../utils/wrap'

const memeRouter = Router()

memeRouter.get('/', wrap(memeController.getAllMemes))
memeRouter.get('/:id', wrap(memeController.getMeme))
memeRouter.post('/', wrap(memeController.createMeme))
memeRouter.put('/:id', wrap(memeController.updateMeme))
memeRouter.delete('/:id', wrap(memeController.removeMeme))

export { memeRouter }
