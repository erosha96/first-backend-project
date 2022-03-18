import createError from 'http-errors'

export function wrap(callback) {
  return (req, res, next) => {
    return Promise.resolve(callback(req, res, next)).catch((e) => {
      next(e)
    })
  }
}
