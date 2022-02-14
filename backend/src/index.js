import app from './app.js'
import { config } from './config'
import { sequelize } from './models'
import redisClient from './utils/redis'

const boot = () => {
  app.listen(config.PORT, () => {
    console.log('Server started')
  })
}

console.log('start')
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database')
    redisClient.connect().then(() => {
      console.log('Connected to redis')
      boot()
    })
  })
  .catch((e) => {
    console.log('Error while connecting to database')
    console.error(e)
  })
