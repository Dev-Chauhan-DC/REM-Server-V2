'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class looking_for extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      looking_for.hasMany(models.properties, {
        foreignKey: 'looking_for_id'
      })
    }
  }
  looking_for.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'looking_for',
  });
  return looking_for;
};