'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flooring_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      flooring_types.hasMany(models.properties,{
        foreignKey: 'flooring_types_id'
      })

    }
  }
  flooring_types.init({
    flooring_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'flooring_types',
  });
  return flooring_types;
};