'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property_photo_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      property_photo_categories.hasMany(models.property_photos, {
        foreignKey: 'category_id'
      })
    }
  }
  property_photo_categories.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'property_photo_categories',
  });
  return property_photo_categories;
};