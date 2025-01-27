'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property_photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      property_photos.belongsTo(models.properties, {
        foreignKey: 'properties_id'
      })

      property_photos.belongsTo(models.property_photo_categories, {
        foreignKey: 'category_id'
      })
    }
  }
  property_photos.init({
    properties_id: DataTypes.INTEGER,
    photos: DataTypes.TEXT,
    file_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'property_photos',
  });
  return property_photos;
};
