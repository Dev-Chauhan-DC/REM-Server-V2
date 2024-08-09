'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class interested_peoples extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      interested_peoples.belongsTo(models.properties,{
        foreignKey: 'properties_id'
      })

      interested_peoples.belongsTo(models.users,{
        foreignKey: 'users_id'
      })

    }
  }
  interested_peoples.init({
    properties_id: DataTypes.INTEGER,
    users_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'interested_peoples',
  });
  return interested_peoples;
};