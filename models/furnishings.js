'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class furnishings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      furnishings.hasMany(models.properties,{
        foreignKey: 'furnishings_id'
      })

    }
  }
  furnishings.init({
    furnishing: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'furnishings',
  });
  return furnishings;
};