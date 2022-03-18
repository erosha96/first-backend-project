import { DataTypes } from 'sequelize'
import { ModelBuilder } from './ModelBuilder'
import MemeTag from './MemeTag.js'
import { v4 } from 'uuid'

export default class Tag extends ModelBuilder {
  static tableName = 'tags'
  static modelName = 'tag'

  static schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      unique: true
    }
  }

  static options = {
    timestamps: true,
    hooks: {
      beforeCreate(tag) {
        tag.id = v4()
      }
    }
  }

  static associate(models) {
    Tag.belongsToMany(models.meme, {
      through: MemeTag,
      onDelete: 'CASCADE',
      foreignKey: { name: 'tagId', allowNull: false }
    })
    Tag.hasMany(models.memeTag, {
      foreignKey: { name: 'tagId', allowNull: false }
    })
  }
}
