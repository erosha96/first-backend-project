import { DataTypes } from 'sequelize'
import { ModelBuilder } from './ModelBuilder'

export default class Meme extends ModelBuilder {
  static tableName = 'memes'
  static modelName = 'meme'

  static schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  }

  static associate(models) {
    Meme.belongsTo(models.file, {
      foreignKey: { name: 'fileId', as: 'file' }
    })
    Meme.belongsTo(models.user, {
      foreignKey: { name: 'userId', as: 'user' }
    })
  }
}
