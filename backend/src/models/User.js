import { DataTypes } from 'sequelize'
import { ModelBuilder } from './ModelBuilder'
import { v4 } from 'uuid'

export default class User extends ModelBuilder {
  static tableName = 'users'
  static modelName = 'user'

  static schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email',
      validate: { isEmail: { msg: 'Must be a valid email address' } }
    },
    password: { type: DataTypes.STRING, allowNull: false }
  }

  static options = {
    timestamps: true,
    hooks: {
      beforeCreate(user) {
        user.id = v4()
      }
    }
  }

  static associate(models) {
    console.log(models)
    User.hasMany(models.meme, {
      foreignKey: 'userId',
      as: 'memes'
    })
    User.hasMany(models.file, {
      foreignKey: 'userId',
      as: 'files'
    })
  }
}
