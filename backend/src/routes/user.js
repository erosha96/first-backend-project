import { Router } from 'express'
import { wrap } from '../utils/wrap'
import { authMiddleware } from '../middlewares/auth'
import userController from '../controllers/userController.js'
import { UpdateUserRequest } from '../requests/user/UpdateUserRequest.js'
import { validate } from '../utils/validate.js'
import { UpdatePasswordRequest } from '../requests/user/UpdatePasswordRequest.js'

const userRouter = Router()

userRouter.get('/self', authMiddleware, wrap(userController.getSelf))
userRouter.patch('/self', authMiddleware, validate(UpdateUserRequest), wrap(userController.updateSelf))
userRouter.get('/:id', authMiddleware, wrap(userController.getUser))
userRouter.put(
  '/self/password',
  authMiddleware,
  validate(UpdatePasswordRequest),
  wrap(userController.updatePassword)
)

export { userRouter }
