import express from 'express'
import router from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'
import createError from 'http-errors'

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

router.init(app)

app.use(function (err, req, res, next) {
  if (createError.isHttpError(err)) {
    res.status(err.statusCode).send(err.message || err)
  } else {
    console.log(err)
    res.status(500).send('Error')
  }
})

export default app
