import { Router } from 'express'
import { wrap } from '../utils/wrap'
import fileController from '../controllers/fileController'
import multer from 'multer'
import { authMiddleware } from '../middlewares/auth'

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 500
  }
})

const fileRouter = Router()

fileRouter.post('/', authMiddleware, upload.single('file'), wrap(fileController.upload))

export { fileRouter }
