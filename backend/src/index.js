import app from './app.js'
import { config } from './config'

app.listen(config.PORT, () => {
  console.log('Server started')
})
