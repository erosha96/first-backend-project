export function wrap(callback) {
  return (req, res, next = console.error) => {
    return Promise.resolve(callback(req, res, next)).catch((e) => next(e))
  }
}
