'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class possessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      possessions.hasMany(models.properties,{
        foreignKey: 'possessions_id'
      })

    }
  }
  possessions.init({
    possession: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'possessions',
  });
  return possessions;
};