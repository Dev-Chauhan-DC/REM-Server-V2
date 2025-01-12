'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class agent_expertise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  agent_expertise.init({
    agent_profile_id: DataTypes.INTEGER,
    agent_expertise_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'agent_expertise',
  });
  return agent_expertise;
};