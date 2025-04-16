'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property_preference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      property_preference.belongsTo(models.properties, {
        foreignKey: 'property_id'
      })

      property_preference.belongsTo(models.preference, {
        foreignKey: 'preference_id'
      })
    }
  }
  property_preference.init({
    property_id: DataTypes.INTEGER,
    preference_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'property_preference',
  });
  return property_preference;
};