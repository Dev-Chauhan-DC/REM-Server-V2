'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class power_backups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      power_backups.hasMany(models.properties,{
        foreignKey: 'power_backups_id'
      })
      
    }
  }
  power_backups.init({
    power_backup: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'power_backups',
  });
  return power_backups;
};