import { DataTypes } from 'sequelize'
import { ModelBuilder } from './ModelBuilder'
import { v4 } from 'uuid'

export default class MemeTag extends ModelBuilder {
  static tableName = 'memeTags'
  static modelName = 'memeTag'

  static schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  }

  static options = {
    timestamps: true,
    hooks: {
      beforeCreate(memeTag) {
        memeTag.id = v4()
      },
      beforeBulkCreate(memeTag) {
        memeTag.forEach((mt) => (mt.id = v4()))
      }
    }
  }

  static associate(models) {
    MemeTag.belongsTo(models.meme, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'memeId',
        allowNull: false
      }
    })

    MemeTag.belongsTo(models.tag, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'tagId',
        allowNull: false
      }
    })
  }
}
