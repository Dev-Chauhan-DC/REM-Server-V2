'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class builder_updates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  builder_updates.init({
    link: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'builder_updates',
  });
  return builder_updates;
};