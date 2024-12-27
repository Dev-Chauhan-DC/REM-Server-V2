'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class builder_team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  builder_team.init({
    avatar: DataTypes.INTEGER,
    name: DataTypes.STRING,
    linkedin_link: DataTypes.STRING,
    builder_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'builder_team',
  });
  return builder_team;
};