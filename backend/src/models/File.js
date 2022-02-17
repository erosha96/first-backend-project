import { DataTypes } from 'sequelize'
import { ModelBuilder } from './ModelBuilder'
import { v4 } from 'uuid'

export default class File extends ModelBuilder {
  static tableName = 'files'
  static modelName = 'file'

  static schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER
    },
    mimetype: {
      type: DataTypes.STRING
    }
  }

  static options = {
    timestamps: true,
    hooks: {
      beforeCreate(file) {
        file.id = v4()
      }
    }
  }
}
