'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class occupancy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      occupancy.hasMany(models.properties, {
        foreignKey: 'occupancy_id'
      })

    }
  }
  occupancy.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'occupancy',
  });
  return occupancy;
};