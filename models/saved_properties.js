'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class saved_properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      saved_properties.belongsTo(models.users, {
        foreignKey: 'user_id'
      })

      saved_properties.belongsTo(models.properties, {
        foreignKey: 'property_id'
      })


    }
  }
  saved_properties.init({
    property_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'saved_properties',
  });
  return saved_properties;
};