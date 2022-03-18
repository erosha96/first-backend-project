import { DataTypes } from 'sequelize'
import { ModelBuilder } from './ModelBuilder'
import { v4 } from 'uuid'

export default class MemeUserStat extends ModelBuilder {
  static tableName = 'memeUserStats'
  static modelName = 'memeUserStat'

  static schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    memeId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    watchTime: {
      type: DataTypes.INTEGER
    },
    rate: {
      type: DataTypes.SMALLINT
    }
  }

  static options = {
    timestamps: true,
    hooks: {
      beforeCreate(memeUserStat) {
        memeUserStat.id = v4()
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['memeId', 'userId']
      }
    ]
  }
  static associate(models) {
    MemeUserStat.belongsTo(models.user, {
      foreignKey: { name: 'userId', as: 'user' }
    })
    MemeUserStat.belongsTo(models.meme, {
      foreignKey: { name: 'memeId', as: 'meme' }
    })
  }
}
