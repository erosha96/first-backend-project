export function wrap(callback) {
  return (req, res, next) => {
    return Promise.resolve(callback(req, res, next)).catch((e) => {
      console.error(e)
      res.send('error')
    })
  }
}
