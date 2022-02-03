import { DataTypes } from 'sequelize'
import { ModelBuilder } from './ModelBuilder'

export default class User extends ModelBuilder {
  static tableName = 'users'
  static modelName = 'user'

  static schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    }
  }
}
