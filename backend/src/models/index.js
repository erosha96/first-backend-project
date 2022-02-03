import { Sequelize } from 'sequelize'
import { databaseConfig } from '../config/database'
import User from './User'

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

const models = [User]

models.forEach((model) => {
  model.initialize(sequelize)
})

await sequelize.sync()

export { sequelize }
