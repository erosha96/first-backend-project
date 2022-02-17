import { Model } from 'sequelize'
export class ModelBuilder extends Model {
  static schema = {}
  static options = {}

  static initialize(sequelize) {
    super.init(this.schema, {
      modelName: this.modelName,
      tableName: this.tableName,
      ...this.options,
      sequelize
    })
  }
}
