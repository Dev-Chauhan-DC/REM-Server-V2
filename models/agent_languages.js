'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class agent_languages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  agent_languages.init({
    agent_profile_id: DataTypes.INTEGER,
    agent_language_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'agent_languages',
  });
  return agent_languages;
};