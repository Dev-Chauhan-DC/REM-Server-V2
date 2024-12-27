'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class builder_team_position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  builder_team_position.init({
    builders_team_id: DataTypes.INTEGER,
    builders_position_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'builder_team_position',
  });
  return builder_team_position;
};