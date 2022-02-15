import { authRouter } from './auth.js'

const init = (app) => {
  app.use('/api/auth', authRouter)
}

export default { init }
