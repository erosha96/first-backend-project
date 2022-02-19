import redisClient from '../utils/redis/index.js'
import User from '../models/User.js'
import createError from 'http-errors'

export const authMiddleware = async (req, res, next) => {
  const token = String(req.headers.authorization).substring(7)
  const userId = await redisClient.GET(token)
  if (userId) {
    const user = await User.findOne({ where: { id: userId } })
    if (user) {
      req.user = user
      next()
      return
    }
  }
  next(createError.Unauthorized('Unauthorized'))
}
