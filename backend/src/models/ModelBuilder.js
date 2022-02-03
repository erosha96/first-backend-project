import { Model } from 'sequelize'
export class ModelBuilder extends Model {
  static schema = {}

  static initialize(sequelize) {
    super.init(this.schema, {
      modelName: this.modelName,
      tableName: this.tableName,
      sequelize
    })
  }
}
