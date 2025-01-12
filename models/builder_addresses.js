'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class builder_addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  builder_addresses.init({
    address: DataTypes.TEXT,
    title: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    builder_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'builder_addresses',
  });
  return builder_addresses;
};