import { Router } from 'express'
import memeController from '../controllers/memeController'
import { wrap } from '../utils/wrap'
import { authMiddleware } from '../middlewares/auth'
import { validate } from '../utils/validate.js'
import { CreateMemeRequest } from '../requests/meme/createMemeRequest.js'

const memeRouter = Router()

memeRouter.get('/', authMiddleware, wrap(memeController.getAllMemes))

memeRouter.get('/random', authMiddleware, wrap(memeController.getRandomMeme))
memeRouter.post('/:id/stats', authMiddleware, wrap(memeController.setMemeStat))
memeRouter.get('/:id', wrap(memeController.getMeme))

memeRouter.post('/', authMiddleware, validate(CreateMemeRequest), wrap(memeController.createMeme))
memeRouter.put('/:id', wrap(memeController.updateMeme))
memeRouter.delete('/:id', wrap(memeController.removeMeme))

export { memeRouter }
