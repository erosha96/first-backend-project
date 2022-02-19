import express from 'express'
import router from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

router.init(app)

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

export default app
