import express from 'express'
import router from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

router.init(app)

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

export default app
