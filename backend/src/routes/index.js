import { authRouter } from './auth'
import { memeRouter } from './meme'
import { fileRouter } from './file'
import { userRouter } from './user.js'

const init = (app) => {
  app.use('/api/auth', authRouter)
  app.use('/api/memes', memeRouter)
  app.use('/api/files', fileRouter)
  app.use('/api/user', userRouter)
}

export default { init }
