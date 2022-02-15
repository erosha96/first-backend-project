import app from './app.js'
import { config } from './config'
import { sequelize } from './models'
import redisClient from './utils/redis'

try {
  await sequelize.authenticate()
  await redisClient.connect()
  app.listen(config.PORT, () => {
    console.log('Server started')
  })
} catch (e) {
  console.error(e)
}
