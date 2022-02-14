import { createClient } from 'redis'
import { redisConfig } from '../../config/redis.js'

const redisClient = createClient({
  url: `redis://${redisConfig.host}:${redisConfig.port}`
})

redisClient.on('error', (err) => console.log('Redis Client Error', err))

export default redisClient
