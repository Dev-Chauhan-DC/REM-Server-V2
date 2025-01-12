'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class agent_expertise_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  agent_expertise_list.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'agent_expertise_list',
  });
  return agent_expertise_list;
};