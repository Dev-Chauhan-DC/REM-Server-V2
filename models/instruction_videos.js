'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class instruction_videos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  instruction_videos.init({
    video: DataTypes.TEXT,
    purpose: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'instruction_videos',
  });
  return instruction_videos;
};