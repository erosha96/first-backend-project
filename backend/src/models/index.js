import { Sequelize } from 'sequelize'
import { databaseConfig } from '../config/database'
import User from './User'
import Meme from './Meme.js'
import File from './File.js'
import Tag from './Tag.js'
import MemeTag from './MemeTag.js'
import MemeUserStat from './MemeUserStat.js'

const { host, port, user, password, databaseName } = databaseConfig

const sequelize = new Sequelize(databaseName, user, password, {
  host: host,
  port: port,
  dialect: 'mysql',
  dialectOptions: { multipleStatements: true },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true
  }
})

const models = [User, Meme, File, Tag, MemeTag, MemeUserStat]

models.forEach((model) => {
  model.initialize(sequelize)
})

models.forEach((model) => {
  if (model.associate) model.associate(sequelize.models)
})

await sequelize.sync()

export { sequelize }
