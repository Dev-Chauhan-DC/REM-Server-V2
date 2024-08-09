'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      facings.hasMany(models.properties,{
        foreignKey: 'facing_id'
      })

    }
  }
  facings.init({
    facing: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'facings',
  });
  return facings;
};