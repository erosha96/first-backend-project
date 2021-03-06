import User from '../models/User.js'
import createError from 'http-errors'
import { comparePasswords, getRandomToken, hashPassword } from '../utils/auth.js'
import redisClient from '../utils/redis/index.js'

async function login({ body }, res) {
  const { username, password } = body

  const user = await User.findOne({ where: { username } })
  if (!user) {
    throw createError.Unauthorized('Wrong username or password')
  }

  if (!(await comparePasswords(password, user.password))) {
    throw createError.Unauthorized('Wrong username or password')
  }

  const token = await getRandomToken()

  await redisClient.SET(token, user.id)
  await redisClient.EXPIRE(token, process.env.AUTH_TOKEN_EXPIRATION_TIME)

  res.send({ token })
}
async function register({ body }, res) {
  const { username, password, email } = body

  if (await User.findOne({ where: { username } })) {
    throw createError.Conflict('Username already exist')
  }
  if (await User.findOne({ where: { email } })) {
    throw createError.Conflict('Email already exist')
  }

  const hashedPassword = await hashPassword(password)

  const newUser = await User.create({
    username,
    password: hashedPassword,
    email
  })

  const token = await getRandomToken()

  await redisClient.SET(token, newUser.id)
  await redisClient.EXPIRE(token, process.env.AUTH_TOKEN_EXPIRATION_TIME)

  res.send({ token })
}
async function logout() {}

export default {
  login,
  register,
  logout
}
