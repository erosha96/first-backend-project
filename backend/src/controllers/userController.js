import createError from 'http-errors'
import User from '../models/User'
import { userMapper } from '../resources/user/userMapper.js'
import { hashPassword } from '../utils/auth.js'

async function getUser(req, res) {
  const user = await User.findOne({ where: { id: req.params.id } })
  if (!user) {
    throw createError.NotFound('User not found')
  }
  res.send({ user: userMapper(user, 'limited') })
}

async function getSelf(req, res) {
  res.send({ user: userMapper(req.user, 'full') })
}

async function updateSelf({ body, user }, res) {
  const { username, email } = body

  if (username && username !== user.username && (await User.findOne({ where: { username } }))) {
    throw createError.Conflict('Username already exist')
  }
  if (email && email !== user.email && (await User.findOne({ where: { email } }))) {
    throw createError.Conflict('Email already exist')
  }

  const newUserData = {
    email: email,
    username: username
  }

  await user.update(newUserData)

  res.send({ user: userMapper(user, 'full') })
}

async function updatePassword({ user, body: { password } }, res) {
  const hashedPassword = await hashPassword(password)

  await user.update({ password: hashedPassword })

  res.send()
}

export default {
  getUser,
  updateSelf,
  getSelf,
  updatePassword
}
