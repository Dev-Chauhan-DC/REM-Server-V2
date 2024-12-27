'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class agent_certificates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  agent_certificates.init({
    file: DataTypes.INTEGER,
    title: DataTypes.STRING,
    certificate_id: DataTypes.TEXT,
    agent_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'agent_certificates',
  });
  return agent_certificates;
};