'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class water_supplies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      water_supplies.hasMany(models.properties,{
        foreignKey: 'water_supplies_id'
      })

    }
  }
  water_supplies.init({
    water_supply: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'water_supplies',
  });
  return water_supplies;
};