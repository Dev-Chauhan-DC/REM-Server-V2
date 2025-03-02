'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  area.init({
    circle_name: DataTypes.STRING,
    region_name: DataTypes.STRING,
    division_name: DataTypes.STRING,
    office_name: DataTypes.STRING,
    name: DataTypes.STRING,
    pincode: DataTypes.STRING,
    office_type: DataTypes.STRING,
    delivery: DataTypes.STRING,
    district_name: DataTypes.STRING,
    state_name: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'area',
  });
  return area;
};