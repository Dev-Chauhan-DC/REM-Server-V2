'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meal_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      meal_type.hasMany(models.property_meal_types, {
        foreignKey: 'meal_type_id'
      })
    }
  }
  meal_type.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'meal_type',
  });
  return meal_type;
};