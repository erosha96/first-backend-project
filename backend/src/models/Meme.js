import { DataTypes } from 'sequelize'
import { ModelBuilder } from './ModelBuilder'
import { v4 } from 'uuid'

export default class Meme extends ModelBuilder {
  static tableName = 'memes'
  static modelName = 'meme'

  static schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    }
  }

  static options = {
    timestamps: true,
    hooks: {
      beforeCreate(meme) {
        meme.id = v4()
      }
    }
  }
  static associate(models) {
    Meme.belongsTo(models.file, {
      foreignKey: { name: 'fileId', as: 'file' }
    })
    Meme.belongsTo(models.user, {
      foreignKey: { name: 'userId', as: 'user' }
    })
    Meme.hasMany(models.memeUserStat, {
      foreignKey: { name: 'memeId', as: 'userStats', allowNull: false }
    })
    Meme.belongsToMany(models.tag, {
      through: models.memeTag,
      onDelete: 'CASCADE',
      foreignKey: { name: 'memeId', allowNull: false }
    })
    Meme.belongsToMany(models.tag, {
      as: 'tagFilter',
      through: models.memeTag,
      onDelete: 'CASCADE',
      foreignKey: { name: 'memeId', allowNull: false }
    })
    Meme.hasMany(models.memeTag, {
      foreignKey: { name: 'memeId', allowNull: false }
    })
  }
}
