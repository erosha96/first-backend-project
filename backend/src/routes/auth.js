import { Router } from 'express'
import authController from '../controllers/authController'
import { wrap } from '../utils/wrap.js'
import { validate } from '../utils/validate.js'
import { RegisterUserRequest } from '../requests/user/RegisterUserRequest.js'

const authRouter = Router()

authRouter.post('/register', validate(RegisterUserRequest), wrap(authController.register))
authRouter.post('/login', wrap(authController.login))
authRouter.post('/logout', wrap(authController.logout))

export { authRouter }
