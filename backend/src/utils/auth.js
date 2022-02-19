import bcrypt from 'bcrypt'
import crypto from 'crypto'

export function hashPassword(password) {
  return bcrypt.hash(password, 8)
}

export function comparePasswords(userPassword, hashedPassword) {
  return bcrypt.compare(userPassword, hashedPassword)
}

export function getRandomToken() {
  return new Promise((resolve, reject) => {
    return crypto.randomBytes(48, (err, buffer) => {
      if (err) {
        reject()
      } else {
        resolve(buffer.toString('hex'))
      }
    })
  })
}
