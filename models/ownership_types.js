'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ownership_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ownership_types.hasMany(models.properties,{
        foreignKey: 'ownership_types_id'
      })

    }
  }
  ownership_types.init({
    ownership_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ownership_types',
  });
  return ownership_types;
};