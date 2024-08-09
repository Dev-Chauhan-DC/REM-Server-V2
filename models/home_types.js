'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class home_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      home_types.hasOne(models.properties,{
        foreignKey: 'home_types_id'
      })

    }
  }
  home_types.init({
    home_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'home_types',
  });
  return home_types;
};