'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property_amenities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      property_amenities.belongsTo(models.properties,{
        foreignKey: 'properties_id'
      })

      property_amenities.belongsTo(models.amenities,{
        foreignKey: 'amenities_id'
      })
      
    }
  }
  property_amenities.init({
    properties_id: DataTypes.INTEGER,
    amenities_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'property_amenities',
  });
  return property_amenities;
};