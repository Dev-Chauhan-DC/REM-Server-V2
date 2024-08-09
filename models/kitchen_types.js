'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kitchen_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      kitchen_types.hasMany(models.properties,{
        foreignKey: 'kitchen_types_id'
      })

    }
  }
  kitchen_types.init({
    kitchen_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kitchen_types',
  });
  return kitchen_types;
};