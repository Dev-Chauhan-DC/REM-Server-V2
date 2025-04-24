'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property_meal_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      property_meal_types.belongsTo(models.properties, {
        foreignKey: 'property_id'
      })

      property_meal_types.belongsTo(models.meal_type, {
        foreignKey: 'meal_type_id'
      })
    }
  }
  property_meal_types.init({
    property_id: DataTypes.INTEGER,
    meal_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'property_meal_types',
  });
  return property_meal_types;
};